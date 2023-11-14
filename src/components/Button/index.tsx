import React from "react";
import { useTranslation } from "react-i18next";

import clsx from "helpers";

const Button = ({
  text,
  variation = "primary",
  onClick,
  disabled = false,
}: {
  onClick?: () => void;
  text: string;
  variation?: "primary" | "secondary";
  disabled: boolean;
}) => {
  const [, { language }] = useTranslation();

  const selectedLanguage =
    language === "ar" || language === "en" ? language : "en";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx("rounded-md flex px-8 py-4  items-center", {
        "bg-primary hover:bg-secondary text-white hover:text-primary": variation === "primary",
        "bg-secondary hover:bg-primary text-primary hover:text-white": variation === "secondary",
      })}
    >
      <span
        className={clsx("uppercase font-semibold text-base 4xl:text-2xl")}
      >
        {text}
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
    </button>
  );
};

export default Button;
