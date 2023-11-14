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
  slidesPerView: "auto",
  navigation: true,
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

  return (
    <div
      dir="ltr"
      className="max-w-[calc(100vw-4rem)] md:max-w-[calc(100vw-18rem)]"
    >
      <Swiper
        {...settingsSwiper}
        onRealIndexChange={(swiper) => handeleSlideChanged(swiper.realIndex)}
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
