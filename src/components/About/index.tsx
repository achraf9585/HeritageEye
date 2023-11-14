import React from "react";
import { useTranslation } from "react-i18next";

import PatternTile from "components/PatternTile";

import Layout from "./Layout";

const About = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div className="px-8 py-16 2xl:py-32 grid text-center md:justify-items-center relative z-0">
        <PatternTile
          className="hidden md:block"
          numberOfTiles={3}
          stroke="#FFF2D6"
          singleTileWidth={27}
        />
        <PatternTile
          className="block md:hidden"
          numberOfTiles={5}
          stroke="#FFF2D6"
          singleTileWidth={27}
        />
        <h2
          id="mission"
          className="font-secondary text-3xl md:text-5xl 3xl:text-8xl font-normal text-secondary pb-4"
        >
          {t("about.about")}
        </h2>
        <p className="text-secondary text-base md:text-xl 3xl:text-2xl max-w-[1000px] 3xl:max-w-[1500px]">
          {t("about.mainDescription")}
        </p>
        <div className="pt-5 md:pt-28 relative">
          <PatternTile
            className="absolute hidden md:block top-16 -z-10 -left-12"
            numberOfTiles={3}
            stroke="#FFF2D6"
            singleTileWidth={100}
          />
          <div
            className="relative w-full my-auto scroll-m-28 md:scroll-mt-40 image-carousel"
            style={{
              backgroundImage: "url('/images/about.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center px-9 py-32 lg:px-48 2xl:py-52 xl:py-32">
              <h2 className="font-secondary text-3xl md:text-5xl 3xl:text-8xl font-normal text-white pb-8">
                {t("about.mission")}
              </h2>
              <p className="text-white text-base md:text-xl max-w-[800px]">
                {t("about.missionDescription")}
              </p>
            </div>
          </div>
          <PatternTile
            className="absolute hidden md:block -bottom-8 right-12"
            numberOfTiles={3}
            stroke="#FFF2D6"
            singleTileWidth={100}
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
