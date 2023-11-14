import React from "react";

import Image from "next/image";

import { getRelativeCoordinates } from "../utils";
interface IProps {
  longitude: number;
  latitude: number;
  image: string;
  title: string;
  siteId: string;
  handleSelectSite?: (siteId: string) => void;
  mapDimentions: {
    width: number;
    height: number;
  };
}

const Site: React.FC<IProps> = ({
  image,
  latitude,
  longitude,
  mapDimentions,
  title,
  siteId,
  handleSelectSite,
}) => {
  const relativeCoordinates = getRelativeCoordinates(mapDimentions, {
    height: latitude,
    width: longitude,
  });

  return (
    <div
      className="absolute z-10"
      style={{
        top: `${relativeCoordinates.heigthPixel}px`,
        left: `${relativeCoordinates.widthPixel}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <button onMouseEnter={() => handleSelectSite?.(siteId)}>
        <Image
          src={image}
          width={50}
          height={50}
          alt={title}
          className="cursor-pointer w-9 h-9 md:w-10 md:h-10 3xl:w-12 3xl:h-12 4xl:w-14 4xl:h-14 5xl:w-16 5xl:h-16 6xl:w-24 6xl:h-24"
        />
      </button>
    </div>
  );
};

export default Site;
