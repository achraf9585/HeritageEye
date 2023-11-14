import React from "react";
import { useTranslation } from "react-i18next";

import Logo from "components/Logo";

import Layout from "./Layout";

const Footer = () => {
  const [t, { language }] = useTranslation();

  const selectedLanguage =
    language === "ar" || language === "en" ? language : "en";

  return (
    <Layout>
      <div className="md:px-24 px-8 pb-12 pt-24 grid md:grid-flow-col gap-10 md:gap-0 md:pt-12 md:pb-8 text-secondary relative z-0">
        <div>
          <h3 className=" pb-6">
            <Logo className="fill-secondary" />
          </h3>
          <p className="text-base md:text-lg max-w-[720px]">
            {t("description")}
          </p>
        </div>
        <div>
          {/* <h3 className="text-2xl font-semibold pb-6">{t("site")}</h3> */}
          <ul
            dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
            className="grid gap-9 footer-links"
          >
            <li>
              <a href="#">{t("nav.home")}</a>
            </li>
            <li>
              <a href="#map">{t("nav.map")}</a>
            </li>
            <li>
              <a href="#about">{t("nav.about")}</a>
            </li>
            <li>
              <a href="#mission">{t("nav.ourMission")}</a>
            </li>
            {/* <li>
              <a href="#sites">{t("nav.heritageSites")}</a>
            </li> */}
            {/* <li>
              <a href="#downloadApps">{t("nav.downloadApps")}</a>
            </li> */}
          </ul>
        </div>
        {/* <div>
          <h3 className="text-2xl font-semibold pb-6">{t("social")}</h3>
          <ul
            dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
            className="grid gap-9 footer-links"
          >
            <li>
              <a href="https://www.facebook.com/">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/">Instagram</a>
            </li>
            <li>
              <a href="https://www.youtube.com/">Youtube</a>
            </li>
          </ul>
        </div> */}
      </div>
    </Layout>
  );
};

export default Footer;
