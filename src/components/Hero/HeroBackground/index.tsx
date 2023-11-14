import SphereViewer from "components/sphere";
import React from "react";

import ReactChildrenProps from "types/ReactChildren";

const HeroBackground: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <section className="relative pb-[10vh]">
      <div className="bg-pattern-light w-full h-screen  absolute -z-10"></div>
      <div
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
        }}
        className="w-full h-screen absolute -z-10 "
      />
      <div className="bg-secondary absolute h-[110vh]  w-full md:w-1/2">
        <div className="bg-pattern-light w-full h-full absolute"></div>
        <div
          style={{
            background:
              "linear-gradient(180deg, #FFF2D6 0%, rgba(255, 242, 214, 0) 100%)",
          }}
          className="w-full hidden md:block h-screen absolute"
        />
      </div>
      <div className="relative pt-[110px] md:pt-[128px]  3xl:pt-[260px] 4xl:pt-[300px] 5xl:pt-[460px] z-10 w-full md:h-screen h-[90vh]">
        {children}
      </div>
    </section>
  );
};

export default HeroBackground;
