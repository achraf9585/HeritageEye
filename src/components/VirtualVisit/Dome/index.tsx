import { useEffect, useState } from "react";

import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { PerspectiveCamera } from "three";

import { TSiteModalProps } from "types/ISiteModalProps";

import InfoButtons from "../InfoButtons";
import NavigationButtons from "../NavigationButtons";

interface DomeProps {
  id: number;
  names: string[];
  url: string;
  modals: TSiteModalProps[];
  positions: number[][];
  links: number[];
  cameraPosition: number[];
  onClick: (arg0: number) => void;
  texture: THREE.Texture;
  cameraControlsRef: React.RefObject<CameraControls>;
}

function AnimationIn(
  camera: PerspectiveCamera,
  onClick: (arg0: number) => void,
  i: number
) {
  gsap.to(camera, {
    fov: 50,
    duration: 2,
    //ease: "slow(0.7, 0.7, false)",
    ease: "power1.inOut",
    onUpdate: function () {
      camera.updateProjectionMatrix();
    },
    onComplete: function () {
      onClick(i);
      AnimationOut(camera);
    },
  });
  onClick(i);
}

function AnimationOut(camera: PerspectiveCamera) {
  gsap.to(camera, {
    fov: 80,
    duration: 2,
    ease: "power1.inOut",
    onUpdate: function () {
      camera.updateProjectionMatrix();
    },
  });
}

function LandingAnimation(
  camera: PerspectiveCamera,
  cameraControlsRef: React.RefObject<CameraControls>,
  cameraPosition: number[]
) {
  //const clock = new THREE.Clock();

  //cameraControlsRef.current?.lookInDirectionOf(cameraPostion[0], cameraPostion[1], cameraPostion[2], true)
  if (cameraControlsRef.current) {
    gsap
      .timeline()
      .add("start")
      .to(
        cameraControlsRef.current.camera.position,
        {
          x: -cameraPosition[0],
          y: -cameraPosition[1],
          z: -cameraPosition[2],
          duration: 5,
          ease: "Power3.easeInOut",
          onUpdate: function () {
            //console.log(camera.position)
            //cameraControlsRef.current!.camera.position.set(camera.position.x, camera.position.y, camera.position.z);
            //cameraControlsRef.current?.lookInDirectionOf(0, 0, camera.position.z, true)
            //cameraControlsRef.current!.lookInDirectionOf(camera.position.x, camera.position.y, camera.position.z, false)
            if (cameraControlsRef.current) {
              cameraControlsRef.current.setPosition(
                camera.position.x,
                camera.position.y,
                camera.position.z,
                false
              );
            }
            //cameraControlsRef.current!.camera.updateProjectionMatrix();
            //const delta = clock.getDelta();
            //const hasControlsUpdated = cameraControlsRef.current!.update( delta );

            //console.log(cameraControlsRef.current!.camera.position)
            //console.log(delta + "  " + hasControlsUpdated)
            //camera.updateProjectionMatrix();
            //cameraControlsRef.current?.update(0);
          },
        },
        "start"
      )
      .to(
        camera,
        {
          fov: 80,
          duration: 5,
          ease: "Power3.easeInOut",
          onUpdate: function () {
            camera.updateProjectionMatrix();
          },
        },
        "start"
      );
  }
}

let actualPhotoId = -1;
//const isFirstScene = true;

const Dome: React.FC<DomeProps> = ({
  id,
  names,
  positions,
  links,
  modals,
  onClick,
  texture,
  url,
  cameraControlsRef,
  cameraPosition,
}) => {
  const [domeTexture, setDomeTexture] = useState<THREE.Texture>(texture);

  domeTexture.wrapS = THREE.RepeatWrapping;
  domeTexture.repeat.x = -1;

  const textureLoader = new THREE.TextureLoader();

  const icon = textureLoader.load("/images/MoveButton.png");
  const iconToggleModal = textureLoader.load("/images/infoIcon.png");

  const { camera } = useThree();

  if (id != actualPhotoId) {
    actualPhotoId = id;
    setDomeTexture(texture);
  }

  const handleNavigationButtonClick = (i: number) => {
    const onComplete = () => {
      // Change the image after the zoom animation is complete
      AnimationOut(camera as PerspectiveCamera);
    };
    AnimationIn(camera as PerspectiveCamera, onClick, i);
  };

  useEffect(() => {
    const controller = new AbortController();

    let timeout = 750;

    if ((camera as PerspectiveCamera).fov > 100) {
      LandingAnimation(
        camera as PerspectiveCamera,
        cameraControlsRef,
        cameraPosition
      );
      timeout = 5000;
    }

    textureLoader.loadAsync(url).then((textureLoaded) => {
      setTimeout(() => {
        if (!controller.signal.aborted) {
          setDomeTexture(textureLoaded);
        }
      }, timeout);
    });

    return () => {
      controller.abort();
    };
  }, [url]);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[100, 60, 10]} />
        <meshBasicMaterial map={domeTexture} side={THREE.BackSide} />
      </mesh>
      <NavigationButtons
        positions={positions}
        names={names}
        url={url}
        links={links}
        id={id}
        onClick={handleNavigationButtonClick}
      />
      <InfoButtons
        icon={iconToggleModal}
        modals={modals}
        cameraControlsRef={cameraControlsRef}
      />
    </group>
  );
};

export default Dome;
