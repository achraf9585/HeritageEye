import React from "react";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/router";

import Logo from "components/Logo";

const Navbar = () => {
  const router = useRouter();

  /* const changeLanguage: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    router.push(router.pathname, router.asPath, { locale: e.target.value });
  }; */

  const changeLanguageAction = () => {
    router.push(router.pathname, router.asPath, {
      locale: router.locale === "ar" ? "en" : "ar",
    });
  };
  const [t] = useTranslation();

  return (
    <nav className="py-2 md:py-5 3xl:py-8 px-5 md:px-20 3xl:px-32 fixed top-0 left-0 z-20 w-full bg-transparent backdrop-blur-lg">
      <div className="mx-auto flex items-center justify-between">
        <div className="text-5xl">
          <Logo className="h-14 3xl:h-16 4xl:h-24" />
        </div>
        <div className="3xl:text-2xl 5xl:text-4xl 6xl:text-6xl items-center relative md:grid md:grid-flow-col md:gap-2 lg:gap-12">
          <a
            className="px-2 invisible md:visible hover:underline hover:text-green-900"
            href="#about"
          >
            {t("nav.about")}
          </a>
          <a
            className="px-2 invisible md:visible hover:underline hover:text-green-900"
            href="#map"
          >
            {t("nav.map")}
          </a>
          <a
            className="px-2 invisible md:visible hover:underline hover:text-green-900"
            href="#mission"
          >
            {t("nav.ourMission")}
          </a>
          {/* <a className="px-2 invisible md:visible hover:underline hover:text-green-900" href="#sites">
            {t("nav.heritageSites")}
          </a> */}
          <a
            className="px-2 invisible md:visible hover:underline hover:text-green-900"
            href="#downloadApps"
          >
            {t("nav.downloadApps")}
          </a>
          <button
            className={
              (router.locale === "ar" ? "left-2" : "right-2") +
              " font-aux font-bold hover:underline hover:text-green-900 z-50 px-3 py-2 bg-white bg-opacity-60 rounded-lg md:bg-transparent absolute top-0 md:relative"
            }
            onClick={changeLanguageAction}
          >
            {router.locale === "ar" ? "EN" : "عربي"}
          </button>
          {/* <select
            onChange={changeLanguage}
            value={router.locale}
            className={
              "z-50 ml-4 px-2 py-1 bg-white bg-opacity-60 rounded-lg md:bg-transparent fixed top-5 md:top-0 md:relative " +
              (router.locale === "ar" ? "left-5" : "right-5")
            }
          >
            <option value="en" className="text-xs">
              En
            </option>
            <option value="ar" className="text-xs">
              Ar
            </option>
          </select> */}
          {/* <button className=" bg-primary rounded-md text-white">
            <a href="google.com" className="flex  px-8 py-4  items-center">
              <span className="pr-3 uppercase font-semibold text-base">
                {t("nav.visitVRXp")}
              </span>
              <svg
                width="13"
                className="rotate-180"
                height="10"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7L17 7M1 7L7 1M1 7L7 13"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
