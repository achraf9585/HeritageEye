import { Merriweather,Poppins } from "@next/font/google";
import localFont from "@next/font/local";
import i18n from "locales";

import type { AppProps } from "next/app";

import TranslationProvider from "components/TranslationProvider";

if (!i18n.isInitialized) {
  i18n.init();
}
import { useEffect } from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";

import { useRouter } from "next/router";

import "../styles/globals.css";
import "components/Hero/Carousel/styles.css";
const omarBold = localFont({
  src: "./Omar-Bold.ttf",
  variable: "--main-font",
});
const adobeArabicShin = localFont({
  src: "./Adobe-arabic-shin.ttf",
  weight: "bold",
  variable: "--secondary-font",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    },[dir]);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --main-font: ${locale === "ar" ? omarBold.style.fontFamily : poppins.style.fontFamily};
            --secondary-font: ${locale === "ar" ? adobeArabicShin.style.fontFamily : merriweather.style.fontFamily};
            --aux-font: ${locale === "ar" ? poppins.style.fontFamily : omarBold.style.fontFamily };
          }
        `}
      </style>
      <TranslationProvider >
        <Component {...pageProps} />
      </TranslationProvider>
    </>
  );
}
