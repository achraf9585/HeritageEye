import React, { useEffect } from "react";

import i18n from "locales";

import { useRouter } from "next/router";

import ReactChildrenProps from "types/ReactChildren";

const TranslationProvider: React.FC<ReactChildrenProps> = ({ children }) => {
  // Put Header or Footer Here
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return <>{children}</>;
};

export default TranslationProvider;
