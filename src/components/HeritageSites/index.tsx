import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import ButtonLink from "components/ButtonLink";
import PatternTile from "components/PatternTile";

import clsx from "helpers";

import { TSitesProps } from "types/ISitesProps";

import Carousel from "./Carousel";
import Layout from "./Layout";

const HeritageSites = ({ sites }: { sites: TSitesProps }) => {
  const [t] = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Layout>
      <div className="relative pb-16 pt-24 md:py-20 2xl:py-32 px-8 md:px-36 md:text-center grid justify-items-center z-0">
        <div className="md:pb-20 pb-14">
          <PatternTile
            numberOfTiles={5}
            stroke="#1EA84C"
            className="pb-3"
            singleTileWidth={27}
          />
          <h2 className="font-secondary text-3xl md:text-5xl font-normal pb-2">
            {t("heritage.title")}
          </h2>
          <p className="text-brownish text-base md:text-lg max-w-[650px]">
            {t("heritage.mainDescription")}
          </p>
        </div>
        <Carousel onSlideChanged={(_, curr) => setCurrentSlide(curr)}>
          {sites.map((site) => (
            <div key={site.id}>
              <Image
                width={567}
                height={500}
                className={clsx(
                  "rounded-md pointer-events-none image-carousel"
                )}
                alt={site.title}
                src={site.image.url}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </Carousel>
        <ButtonLink href={sites[currentSlide].link} text={t("visit")} />
      </div>
    </Layout>
  );
};

export default HeritageSites;
