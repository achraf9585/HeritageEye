import Swiper from "swiper";

export default function effectCarousel({
  swiper,
  on,
}: {
  swiper: Swiper;
  on: Swiper["on"];
}) {
  on("beforeInit", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (swiper.params.effect !== "carousel") return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    swiper.classNames.push(`${swiper.params.containerModifierClass}carousel`);
    const overwriteParams = {
      watchSlidesProgress: true,
      centeredSlides: true,
    };

    Object.assign(swiper.params, overwriteParams);
    Object.assign(swiper.originalParams, overwriteParams);
  });
  on("progress", () => {
    const screenWidth = window.innerWidth;
    let screen: "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs" = "xl";

    switch (true) {
      case screenWidth > 1920:
        screen = "3xl";
        break;
      case screenWidth > 1536:
        screen = "2xl";
        break;
      case screenWidth > 1280:
        screen = "xl";
        break;
      case screenWidth > 1024:
        screen = "lg";
        break;
      case screenWidth > 768:
        screen = "md";
        break;
      case screenWidth > 640:
        screen = "sm";
        break;
      default:
        screen = "xs";
        break;
    }
    let translateOffset = 0;

    switch (screen) {
      case "3xl":
        translateOffset = 30;
        break;
      case "2xl":
        translateOffset = 34;
        break;
      case "xl":
        translateOffset = 65;
        break;
      case "lg":
        translateOffset = 25;
        break;
      case "md":
        translateOffset = 45;
        break;
      default:
        translateOffset = 35;
        break;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (swiper.params.effect !== "carousel") return;
    const scaleStep = 0.2;
    const zIndexMax = swiper.slides.length;

    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slideEl = swiper.slides[i] as HTMLDivElement;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const slideProgress = swiper.slides[i].progress;
      const absProgress = Math.abs(slideProgress);
      let modify = 1;

      if (absProgress > 1) {
        modify = (absProgress - 1) * 0.3 + 1;
      }
      const translate = `${slideProgress * modify * translateOffset}%`;
      const scale = 1 - absProgress * scaleStep;
      const zIndex = zIndexMax - Math.abs(Math.round(slideProgress));

      slideEl.style.transform = `translateX(${translate}) scale(${scale})`;
      slideEl.style.zIndex = zIndex.toString();
      if (absProgress > 1.5) {
        slideEl.style.opacity = (0).toString();
        slideEl.style.scale = (0).toString();
      } else {
        slideEl.style.opacity = (1).toString();
        slideEl.style.scale = (1).toString();
      }
    }
  });

  on("setTransition", (_, duration) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (swiper.params.effect !== "carousel") return;
    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slideEl = swiper.slides[i] as HTMLDivElement;
      const opacityEls = slideEl.querySelectorAll<HTMLDivElement>(
        ".swiper-carousel-animate-opacity"
      );

      slideEl.style.transitionDuration = `${duration}ms`;
      opacityEls.forEach((opacityEl) => {
        opacityEl.style.transitionDuration = `${duration}ms`;
      });
    }
  });
}
