import React, { Suspense, useEffect, useRef, useState } from "react";

import { CameraControls, Preload } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { getSiteData, getSites } from "api";
import { ParsedUrlQuery } from "querystring";
import * as THREE from "three";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import SEO from "components/SEO";
import Dome from "components/VirtualVisit/Dome";
import Loader from "components/VirtualVisit/Loader";
import Menu from "components/VirtualVisit/Menu";

import { TSiteDataProps } from "types/ISiteDataProps";

const customCameraPpositiion = new THREE.Vector3(0, 0, 0.1);

interface IProps {
  siteInfos: TSiteDataProps["infos"];
  sitePhotos: TSiteDataProps["photos"];
}

interface IPortalProps {
  siteInfos: TSiteDataProps["infos"];
  sitePhotos: TSiteDataProps["photos"];
  updateCameraPosition: (arg0: number[]) => void;
  cameraControlsRef: React.RefObject<CameraControls>;
}

interface ICameraPositionProps {
  cameraControlsRef: React.RefObject<CameraControls>;
  cameraPosition: number[];
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async ({
  locales,
}) => {
  const sites = getSites();

  const paths = (await sites)
    .map((value) => {
      return locales!.map((locale) => {
        return {
          params: {
            site: value.id,
          },
          locale,
        };
      });
    })
    .flat();

  return {
    paths,
    fallback: false,
  };
};

let isFirstPhoto = true;

export const getStaticProps: GetStaticProps<IProps> = async ({
  params,
  locale,
}) => {
  const siteId = params !== undefined ? (params.site as string) : "";
  const siteData = await getSiteData(siteId, locale);

  return {
    props: {
      siteInfos: siteData.infos,
      sitePhotos: siteData.photos,
    },
    revalidate: 60,
  };
};

function Portals({
  cameraControlsRef,
  sitePhotos,
  updateCameraPosition,
}: IPortalProps) {
  const [which, set] = useState(0);
  const {
    id,
    links,
    url,
    names,
    positions,
    nextCameraPositions,
    cameraPosition,
    modals,
  } = sitePhotos[which];
  //const bg = useLoader(THREE.ImageLoader, siteInfos.loadingImage);
  const maps = useLoader(THREE.TextureLoader, sitePhotos.map((entry) => entry.urlLQ)) // prettier-ignore

  const setNextPhoto = (index: number) => {
    set(sitePhotos.findIndex((el) => el.id == links[index]));
    updateCameraPosition(nextCameraPositions[index]);
  };

  if (isFirstPhoto) {
    updateCameraPosition(cameraPosition);
    isFirstPhoto = false;
  }

  return (
    <Dome
      onClick={(index: number) => setNextPhoto(index)}
      id={id}
      names={names}
      modals={modals}
      positions={positions}
      texture={maps[which]}
      url={url}
      links={links}
      cameraControlsRef={cameraControlsRef}
      cameraPosition={cameraPosition}
    />
  );
}

function CustomCameraControls({
  cameraControlsRef,
  cameraPosition,
}: ICameraPositionProps) {
  //const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    //cameraControlsRef.current?.rotate(1, 0, false)
    //cameraControlsRef.current?.moveTo(1,1,1,true)if (isFirstPhoto) {

    //console.log(cameraControlsRef.current!.camera.position)
    //console.log("===== FIRST POSITION ======="+ cameraPosition[0] + " , " + cameraPosition[1] + " , " + cameraPosition[2])

    cameraControlsRef.current?.lookInDirectionOf(
      cameraPosition[0],
      cameraPosition[1],
      cameraPosition[2],
      false
    );

    //console.log(cameraControlsRef.current!.camera.position)
    //console.log("============ new camera " + cameraPosition[0] + " , " + cameraPosition[1] + " , " + cameraPosition[2])
  });
  //console.log("hello =============== ",cameraControlsRef)

  return (
    <CameraControls
      azimuthRotateSpeed={-0.5}
      polarRotateSpeed={-0.5}
      enabled={true}
      ref={cameraControlsRef}
      dollySpeed={0.3}
      truckSpeed={0}
      minDistance={5}
      maxDistance={20}
    />
  );
}

//<OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
/*
function CameraBox() {
  const { camera } = useThree();
  const [pos, setPos] = useState(new Vector3());
  const [rot, setRot] = useState(new Vector3());

  const boxRef = useRef<Mesh>(null);

  /*
  //set the box's position and rotation
  useFrame(() => {
    const distance = 85;
    const position = camera.position
      .clone()
      .add(camera.getWorldDirection(new Vector3()).multiplyScalar(distance));

    // Set the box's position to the camera's position
    boxRef.current!.position.copy(position);
    // Set the box's rotation to the camera's rotation
    boxRef.current!.quaternion.copy(camera.quaternion);

    setPos(position);
    setRot(camera.position);
  });


  //Press " " to log the position
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        console.log("Box position:  [", pos.x, ",", pos.y, ",", pos.z, "]");
        console.log(
          "Camera position:  [",
          rot.x * -1,
          ",",
          rot.y * -1,
          ",",
          rot.z * -1,
          "]"
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pos]);
  
  //

  return (
    <group
      onClick={(e) => {
        //console.log("Box position:  [", pos.x, ",", pos.y, ",", pos.z, "]");
      }}
    >
      <mesh ref={boxRef} scale={[3, 3, 3]}>
        <boxBufferGeometry />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
}
*/

const Site: React.FC<IProps> = ({ siteInfos, sitePhotos }) => {
  const [actualCameraPosition, setactualCameraPosition] = useState([
    0, 0, 100.1,
  ]);
  const cameraControlsRef = useRef<CameraControls>(null);
  const updateCameraPosition = (newCameraPosition: number[]) => {
    setactualCameraPosition(newCameraPosition);
  };
  const dynamicRoute = useRouter().asPath;

  useEffect(() => {
    isFirstPhoto = true;
  }, [dynamicRoute]);

  //cursor-fancy

  function CursorAnimation() {
    const [cursorIndex, setCursorIndex] = useState<number>(1);

    useEffect(() => {
      const interval = setInterval(() => {
        setCursorIndex((prevIndex) => (prevIndex < 50 ? prevIndex + 1 : 1));
      }, 50);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      document.documentElement.classList.remove(
        "cursor-image-1",
        "cursor-image-2",
        "cursor-image-3",
        "cursor-image-4",
        "cursor-image-5",
        "cursor-image-6",
        "cursor-image-7",
        "cursor-image-8",
        "cursor-image-9",
        "cursor-image-10",
        "cursor-image-11",
        "cursor-image-12",
        "cursor-image-13",
        "cursor-image-14",
        "cursor-image-15",
        "cursor-image-16",
        "cursor-image-17",
        "cursor-image-18",
        "cursor-image-19",
        "cursor-image-20",
        "cursor-image-21",
        "cursor-image-22",
        "cursor-image-23",
        "cursor-image-24",
        "cursor-image-25",
        "cursor-image-26",
        "cursor-image-27",
        "cursor-image-28",
        "cursor-image-29",
        "cursor-image-30",
        "cursor-image-31",
        "cursor-image-32",
        "cursor-image-33",
        "cursor-image-34",
        "cursor-image-35",
        "cursor-image-36",
        "cursor-image-37",
        "cursor-image-38",
        "cursor-image-39",
        "cursor-image-40",
        "cursor-image-41",
        "cursor-image-42",
        "cursor-image-43",
        "cursor-image-44",
        "cursor-image-45",
        "cursor-image-46",
        "cursor-image-47",
        "cursor-image-48",
        "cursor-image-49",
        "cursor-image-50",
        "cursor-fancy"
        /* Remove other class names */
      );

      document.documentElement.classList.add(`cursor-image-${cursorIndex}`);
    }, [cursorIndex]);

    return null;
  }

  function CursorAnimationControls() {
    const [isActive, setIsActive] = useState(true);
    const lastInteraction = useRef(Date.now());

    useEffect(() => {
      function handleInteraction() {
        lastInteraction.current = Date.now();
        setIsActive(true);
        document.documentElement.classList.add("cursor-fancy");
      }

      function handleInactivity() {
        const now = Date.now();
        const timeSinceLastInteraction = now - lastInteraction.current;

        if (timeSinceLastInteraction > 1500) {
          setIsActive(false);
        }
      }

      document.addEventListener("mousemove", handleInteraction);
      document.addEventListener("mousedown", handleInteraction);
      document.addEventListener("keydown", handleInteraction);

      const intervalId = setInterval(handleInactivity, 1000);

      return () => {
        document.removeEventListener("mousemove", handleInteraction);
        document.removeEventListener("mousedown", handleInteraction);
        document.removeEventListener("keydown", handleInteraction);
        clearInterval(intervalId);
      };
    }, []);

    return isActive ? null : <CursorAnimation />;
  }

  return (
    <>
      {/* <Logo /> */}
      <div
        id="capture"
        className="w-screen h-screen overflow-auto"
        style={{
          backgroundColor: "black",
        }}
      >
        <SEO
          title={siteInfos.title + " | Heritage Eye"}
          description="Explore the rich culture and history of Saudi Arabia through the official portal of the Ministry of Culture. Discover our heritage sites, learn about our traditions, and plan your visit to experience it all firsthand."
          siteName="Heritage Eye"
        />
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          camera={{
            fov: 120,
            near: 0.1,
            far: 1000,
            position: customCameraPpositiion,
          }}
        >
          <CursorAnimationControls />
          <CustomCameraControls
            cameraControlsRef={cameraControlsRef}
            cameraPosition={actualCameraPosition}
          />

          <Suspense fallback={<Loader siteInfos={siteInfos} />}>
            <Preload all />
            <ambientLight />
            <Menu cameraControlsRef={cameraControlsRef} />
            <Portals
              cameraControlsRef={cameraControlsRef}
              updateCameraPosition={updateCameraPosition}
              sitePhotos={sitePhotos}
              siteInfos={siteInfos}
            />
            {/* <CameraBox /> */}
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default Site;
