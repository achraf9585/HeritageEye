import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import { useRouter } from "next/router";

import Button from "components/Button";

import clsx from "helpers";

interface IProps {
  title: string;
  imageSrc: string;
  description: string;
  link: string;
  videoLink: string;
  isOpen?: boolean;
  handleClose?: () => void;
}
const SiteCard: React.FC<IProps> = ({
  title,
  imageSrc,
  description,
  videoLink,
  link,
  isOpen = false,
  handleClose,
}) => {
  const { locale } = useRouter();
  const [isVidePlaying, setIsVideoPlaying] = React.useState(false);
  const [t] = useTranslation();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const handleSiteSelect = () => {
    setIsVideoPlaying(true);
    videoRef.current?.play();
  };
  const handleVideoEnded = () => {
    router.push(link, link, { locale: locale });
  };

  return (
    <>
      <div
        className={clsx(
          "rounded-md max-w-sm md:max-w-md 3xl:max-w-xl 4xl:max-w-3xl 5xl:max-w-4xl 6xl:max-w-7xl md:mx-40",
          "bg-black/60 backdrop-blur-3xl inline-block",
          "p-7 relative z-20 text-secondary",
          "transition-all duration-150 ease-in-out",
          isOpen ? "opacity-100" : " opacity-0",
          isOpen ? "translate-y-0 scale-[1]" : "translate-y-[-4%] scale-[.96]",
          { "pointer-events-none": !isOpen }
        )}
      >
        <div className="flex justify-between pb-3">
          <h3
            className={clsx(
              { "pointer-events-none": !isOpen },
              locale === "ar"
                ? "font-secondary text-2xl md:text-4xl 4xl:text-6xl 5xl:text-8xl 6xl:text-9xl font-normal"
                : "font-secondary text-xl md:text-2xl 4xl:text-4xl 5xl:text-6xl 6xl:text-8xl font-normal"
            )}
          >
            {title}
          </h3>
          <button
            className="bg-orange-100 hover:bg-orange-200 text-green-700 rounded-lg text-xs max:p-1.5  4xl:rounded-6xl lg:mb-[1vh]"
            onClick={handleClose}
          >
            <svg
              aria-hidden="true"
              className="w-[3vh] h-[3vh] xl:w-[4vh] xl:h-[4vh] 4xl:w-[4vh] 4xl:h-[4vh]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
          </button>
        </div>
        <div className="relative w-80 md:w-96 h-40 3xl:w-[500px] 3xl:h-[215px] 4xl:w-[700px] 4xl:h-[289px] 5xl:w-[820px] 5xl:h-[338px] 6xl:w-[1200px] 6xl:h-[495px]">
          <Image
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw"
            priority
            className={clsx("rounded-3xl pointer-events-none")}
            alt={title}
            src={imageSrc}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <p
          className={clsx(
            { "pointer-events-none": !isOpen },
            "pb-8 text-base font-normal pt-7 4xl:text-xl 5xl:text-3xl 6xl:text-5xl"
          )}
        >
          {description}
        </p>

        <Button
          onClick={handleSiteSelect}
          disabled={link === "#"}
          text={link === "#" ? t("comingsoon") : t("Visit3D")}
          variation="secondary"
        />
      </div>
      {isOpen && (
        <video
          className={clsx(
            isVidePlaying ? "opacity-100" : "opacity-0 pointer-events-none",
            "absolute  top-0 left-0 w-screen object-cover h-screen z-50"
          )}
          muted
          ref={videoRef}
          preload={isOpen ? "auto" : "none"}
          onEnded={handleVideoEnded}
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
        >
          <source src={videoLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
};

export default SiteCard;
