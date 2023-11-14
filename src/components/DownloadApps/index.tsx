import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import PatternTile from "components/PatternTile";

import Layout from "./Layout";

const DownloadApps = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div className="px-8 py-16 md:py-32 grid text-center md:justify-items-center relative z-10">
        <PatternTile numberOfTiles={5} stroke="#1EA84C" singleTileWidth={27} />
        <h2 className="font-secondary text-3xl md:text-5xl font-normal text-black pb-8">
          {t("downloadApp.title")}
        </h2>
        <p className="text-brownish text-base md:text-xl max-w-[800px]">
          {t("downloadApp.mainDescription")}
        </p>
        <div className="grid grid-flow-col pt-14 gap-5 items-center">
          <div>
            <a href="https://play.google.com/store/apps/details?id=com.Peaksource.HeritageEye" target="_blank" rel="noreferrer noopener">
              <Image
                className="ml-auto mr-auto"
                src="/images/google-play-badge.png"
                alt="Google Play"
                width={215}
                height={60}
              />
            </a>
          </div>
          <div>
            <a href="https://apps.apple.com/app/%D8%B9%D9%8A%D9%86-%D8%A7%D9%84%D8%AA%D8%B1%D8%A7%D8%AB/id6450995678" target="_blank" rel="noreferrer noopener">
              <Image
                className="ml-auto mr-auto"
                src="/images/app-store-badge.svg"
                alt="App store"
                width={200}
                height={60}
              />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DownloadApps;
