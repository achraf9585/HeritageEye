import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Logo: React.FC = () => {
  const { locale } = useRouter();

  return (
    <div className="absolute z-max m-2 md:m-5 lg:m-6 2xl:m-10">
      <Link
        href="/"
        locale={locale}
        className="flex  w-[20vh] h-[10vh] rounded-xl bg-[#00000099] backdrop-blur-sm"
      >
        <Image
          alt="logo"
          src="/images/logo.png"
          width={400}
          height={1}
          priority={true}
          className="m-auto w-[80%]"
        />
      </Link>
    </div>
  );
};

export default Logo;
