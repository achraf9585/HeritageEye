import React, { useRef } from "react";

import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

import ReactChildrenProps from "types/ReactChildren";

import EffectCarousel from "./lib/effectCarousel";

const settingsSwiper: SwiperProps = {
  modules: [Autoplay, Navigation, Pagination, EffectCarousel],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  effect: "carousel",
  loop: true,
  loopedSlides: 3,
  slidesPerView: "auto",
  navigation: true,
  slidesOffsetBefore: 22,
};

type IProps = {
  onSlideChanged?: (
    previousSlideIndex: number,
    currentSlideIndex: number
  ) => void;
} & ReactChildrenProps;

const Carousel: React.FC<IProps> = ({ children, onSlideChanged }) => {
  const currentSlideIndex = useRef(0);
  const array = React.Children.toArray(children);
  const handeleSlideChanged = (index: number) => {
    const previousSlideIndex = currentSlideIndex.current;

    currentSlideIndex.current = index;
    onSlideChanged?.(previousSlideIndex, index);
  };
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1280;

  return (
    <div
      dir="ltr"
      className="6xl:max-w-[2000px] 5xl:max-w-[1500px] 4xl:max-w-[1100px] 3xl:max-w-[900px] 2xl:max-w-[760px] xl:max-w-[600px] lg:max-w-[400px] max-w-[370px] mx-auto"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Swiper
        {...settingsSwiper}
        onRealIndexChange={(swiper) => handeleSlideChanged(swiper.realIndex)}
        slidesOffsetBefore={isMobile ? -10 : 22}
      >
        {array.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="swiper-carousel-animate-opacity">{slide}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
