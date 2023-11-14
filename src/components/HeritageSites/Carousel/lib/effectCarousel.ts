import Swiper from "swiper";
export default function CarouselSlider({
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
      // const opacityEls = slideEl.querySelectorAll(
      //   ".swiper-carousel-animate-opacity"
      // );
      const scale = 1 - absProgress * scaleStep;
      // const translate = `${
      //   Math.abs(slideProgress) > 1 ? slideProgress * 20 : 0
      // }%`;

      const translate = `${slideProgress * modify * 30}%`;

      const zIndex = zIndexMax - Math.abs(Math.round(slideProgress));

      slideEl.style.transform = `translateX(${translate}) scale(${scale})`;
      slideEl.style.zIndex = zIndex.toString();
      if (absProgress > 3) {
        slideEl.style.opacity = (0).toString();
      } else {
        slideEl.style.opacity = (1).toString();
      }

      // opacityEls.forEach((opacityEl) => {
      //   opacityEl.style.opacity = 1 - absProgress / 3;
      // });
    }
  });

  on("setTransition", (s, duration) => {
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
