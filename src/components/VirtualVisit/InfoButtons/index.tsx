import React, { useState } from "react";

import { CameraControls } from "@react-three/drei";
import * as THREE from "three";

import { TSiteModalProps } from "types/ISiteModalProps";

import Modal from "../Modal";

interface ModalsList {
  icon: THREE.Texture;
  modals: TSiteModalProps[];
  cameraControlsRef: React.RefObject<CameraControls>;
}

const InfoButtons: React.FC<ModalsList> = ({
  icon,
  modals,
  cameraControlsRef,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const handleModalClick = (i: number) => {
    setIndex(i);
    setIsModalVisible(true);
  };
  const handleCloseModalClick = () => {
    setIsModalVisible(false);
  };

  if (
    cameraControlsRef.current?.enabled != null &&
    cameraControlsRef.current?.enabled == false
  ) {
    cameraControlsRef.current!.enabled = true;
  }

  if (isModalVisible && modals.length > 0) {
    return (
      <group>
        <Modal
          onClose={handleCloseModalClick}
          modal={modals[index]}
          cameraControlsRef={cameraControlsRef}
        />
      </group>
    );
  } else {
    return (
      <group>
        {modals.map((modal, i) => (
          <sprite
            key={i}
            position={[modal.position[0], modal.position[1], modal.position[2]]}
            scale={new THREE.Vector3(8, 8, 8)}
            onClick={() => {
              handleModalClick(i);
            }}
          >
            <spriteMaterial map={icon} />
          </sprite>
        ))}
      </group>
    );
  }
};

export default InfoButtons;
