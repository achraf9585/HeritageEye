import React from "react";

import { Html, useProgress } from "@react-three/drei";

import NextImage from "next/image";

import PatternTile from "components/PatternTile";

import { TSiteDataProps } from "types/ISiteDataProps";

interface LoaderProps {
  siteInfos: TSiteDataProps["infos"];
}

const Loader: React.FC<LoaderProps> = ({ siteInfos }) => {
  const { progress } = useProgress();

  return (
    <Html
      center
      style={{
        backgroundImage: "url(" + siteInfos.loadingImage + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="position-unset"
    >
      <div
        className="h-full p-[48%5%10%5%]  md:p-[20%5%10%5%] position-unset lg:p-[5%15%] min-h-screen max-h-screen  min-w-[100vw] grid grid-rows-3 grid-cols-1 lg:grid-cols-3 grid-flow-col gap-4"
        style={{
          backdropFilter: "blur(" + `${(100 - progress) / 5}` + "px)",
        }}
      >
        <div
          className="flex items-center row-span-1 lg:row-span-3 height-inherit lg:h-auto"
          style={{ height: "inherit" }}
        >
          <NextImage
            className="mx-[4vh]"
            src={siteInfos.image.url}
            alt="Modern"
            width={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 900
                : window.innerWidth >= 1600
                ? 360
                : window.innerWidth >= 1500
                ? 320
                : 300
            }
            height={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 900
                : window.innerWidth >= 1600
                ? 360
                : window.innerWidth >= 1500
                ? 320
                : 300
            }
            priority
          />
        </div>
        <div className="flex w-full items-center row-span-2 col-span-1 lg:row-span-3 lg:col-span-2">
          <div className="block w-screen  text-white text-center lg:text-justify">
            <PatternTile
              className="pb-4 md:pb-8"
              numberOfTiles={6}
              stroke="#FFFFFF"
              singleTileWidth={30}
            />
            <h1
              className="text-base md:text-3xl lg:text-4xl xl:text-6xl pb-4 lg:pb-8"
              style={{ fontFamily: "var(--secondary-font)" }}
            >
              {siteInfos.title}
            </h1>
            <p className="text-xs lg:text-base xl:text-xl pb-4 lg:pb-8 text-justify">
              {siteInfos.shortDescription}
            </p>
            <div>
              <div className="mt-4 w-full bg-gray-400 rounded-full h-3.5 dark:bg-gray-700 sm:min-w-[56vh] xl:min-w-[70vh]">
                <div
                  className="bg-white h-3.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
