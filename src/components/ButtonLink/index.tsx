import React from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";

import clsx from "helpers";

const ButtonLink = ({
  href,
  text,
  variation = "primary",
}: {
  href: string;
  text: string;
  variation?: "primary" | "secondary";
}) => {
  const [t, { language }] = useTranslation();

  const selectedLanguage =
    language === "ar" || language === "en" ? language : "en";

  return (
    <button
      className={clsx(
        "rounded-md ",
        href === "#"
          ? "pointer-events-none cursor-not-allowed"
          : "cursor-pointer",
        {
          "bg-primary hover:bg-white text-white hover:text-primary": variation === "primary",
          "bg-secondary hover:bg-primary text-primary hover:text-white": variation === "secondary",
        }
      )}
    >
      <Link
        href={href}
        locale={selectedLanguage}
        className={clsx(
          href === "#"
            ? "pointer-events-none cursor-not-allowed"
            : "cursor-pointer",
          "flex px-4 py-2 lg:px-8 lg:py-4  items-center"
        )}
      >
        <span
          className={clsx("uppercase font-semibold text-xs lg:text-base")}
        >
          {href === "#" ? t("comingsoon") : text}
        </span>
        {/* <svg
          width="13"
          className={clsx(selectedLanguage === "en" ? "rotate-180" : "")}
          height="10"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7L17 7M1 7L7 1M1 7L7 13"
            stroke={variation === "primary" ? "#fff" : "#1EA84C"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
      </Link>
    </button>
  );
};

export default ButtonLink;
