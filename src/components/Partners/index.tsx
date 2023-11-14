import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import PatternTile from "components/PatternTile";

import Layout from "./Layout";

const Pratners = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div className="px-8 py-16 md:py-32 grid text-left md:text-center md:justify-items-center relative z-10">
        <PatternTile numberOfTiles={5} stroke="#1EA84C" singleTileWidth={27} />
        <h2 className="font-secondary text-3xl pb-3 md:text-5xl font-normal text-black">
          {t("partners.title")}
        </h2>
        <div className="grid sm:grid-flow-col grid-flow-row pt-14 sm:gap-28 gap-5 items-center justify-center">
          <div>
            <Image
              className="ml-auto mr-auto"
              src="/images/hertiage-logo.png"
              alt="Heritage commission"
              height={139}
              width={251}
            />
          </div>
          <div>
            <Image
              className="ml-auto mr-auto"
              src="/images/ministry-logo.png"
              alt="Ministry of Culture"
              width={219}
              height={139}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pratners;
