import React, { useEffect, useRef, useState } from "react";

import { Html } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface NavigationButtonProps {
  positions: number[][];
  names: string[];
  url: string;
  id: number;
  links: number[];
  onClick: (arg0: number) => void;
}

const NavigationButtons: React.FC<NavigationButtonProps> = ({
  positions,
  names,
  id,
  url,

  links,
  onClick,
}) => {
  //To show and hide the room names in the sprite with onPointerEnter and leave
  const [isShown, setIsShown] = useState(false);

  //To always show the room name for small screens
  const windowSize = useRef([window.innerWidth]).current[0];

  const gltf = useLoader(GLTFLoader, "/images/coloredarrow.glb");

  const [showHtml, setShowHtml] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowHtml(true);
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, []);

  const [lookAtPosition, setLookAtPosition] = useState(new Vector3(0, 0, 0));
  const [rotation, setRotation] = useState([0, 0, 0]);
  const arrowRefs = useRef<Array<THREE.Object3D | undefined>>([]);

  useEffect(() => {
    arrowRefs.current = arrowRefs.current.slice(0, positions.length);
  }, [positions]);

  useFrame(({ camera }) => {
    arrowRefs.current.forEach((arrow) => {
      if (arrow) {
        arrow.lookAt(camera.position);
        arrow.rotateX(Math.PI / 6);
      }
    });
  });

  return (
    <group>
      {showHtml &&
        positions.map((position, i) => (
          <group key={i}>
            <primitive
              ref={(arrow: THREE.Object3D | undefined) => {
                arrowRefs.current[i] = arrow;
              }}
              object={gltf.scene.clone()}
              position={[position[0], position[1], position[2]]}
              scale={20}
            />
            <mesh
              position={[position[0], position[1], position[2]]}
              onClick={() => {
                onClick(i);
              }}
              onPointerEnter={() => setIsShown(true)}
              onPointerLeave={() => setIsShown(false)}
            >
              <sphereBufferGeometry args={[8, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            <sprite
              name={names[i]}
              position={[position[0], position[1] + 11, position[2]]}
              scale={0}
            >
              <Html className="ltr:-ml-[10vh] w-[20vh] h-[5vh] rtl:-mr-[10vh] z-100">
                {isShown || windowSize < 1000 ? (
                  <div className="bg-[#00000099] absolute bottom-0 left-0 right-0 text-center line-clamp-2 z-1">
                    <span className="text-blue-50 z-1 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,1)] text-sm md:text-sm lg:text-sm xl:text-md 4xl:text-4xl">
                      {names[i]}
                    </span>
                  </div>
                ) : null}
              </Html>
            </sprite>
          </group>
        ))}
    </group>
  );
};

export default NavigationButtons;
