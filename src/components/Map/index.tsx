import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import clsx from "helpers";

import { TSitesProps } from "types/ISitesProps";

import Site from "./Site";
import SiteCard from "./Site/SIteCard";

const Map = ({ sites }: { sites: TSitesProps }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentDimentions, setCurrentDimentions] = useState({
    width: 0,
    height: 0,
  });
  const handleResize = () => {
    const { width, height } = imageRef?.current || { width: 0, height: 0 };

    setCurrentDimentions({ width, height });
  };
  const [currentSiteId, setCurrentSiteId] = useState<string | null>(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image) return;
    const { width, height } = image;

    setCurrentDimentions({ width, height });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const selectedSite = useRef(sites[0]);

  selectedSite.current =
    sites.find((site) => site.id === currentSiteId) || selectedSite.current;

  return (
    <div
      id="map"
      className="relative flex items-center justify-center md:justify-start h-[80vh] sm:h-[100vh] "
    >
      {selectedSite.current && (
        <SiteCard
          title={selectedSite.current.title}
          imageSrc={selectedSite.current.cardImage}
          description={selectedSite.current.longDescription}
          link={selectedSite.current.link}
          videoLink={selectedSite.current.videoLink}
          handleClose={() => setCurrentSiteId(null)}
          isOpen={currentSiteId !== null}
        />
      )}
      {sites.map((site) => (
        <Site
          key={site.id}
          title={site.title}
          handleSelectSite={(siteId) => setCurrentSiteId(siteId)}
          siteId={site.id}
          image={site.pinImage}
          mapDimentions={currentDimentions}
          latitude={site.geolaction.latitude}
          longitude={site.geolaction.longitude}
        />
      ))}

      <div
        className={clsx(
          {
            hidden: currentSiteId === null,
          },
          "w-full h-full absolute top-0 left-0 bg-transparent"
        )}
        onClick={() => setCurrentSiteId(null)}
      />
      <Image
        style={{
          objectFit: "cover",
        }}
        fill
        ref={imageRef}
        className="-z-20"
        alt="cover"
        src="/images/map.jpeg"
        priority
      />
    </div>
  );
};

export default Map;
