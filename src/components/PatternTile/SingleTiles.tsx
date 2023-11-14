import React, { SVGProps } from "react";

const SingleTile = ({
  stroke,
  width = 44,
}: {
  stroke: SVGProps<SVGSVGElement>["stroke"];
  width?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 44 30"
    xmlSpace="preserve"
    className=""
    width={width}
  >
    <path
      d="M0 28.4h.5c2.1 0 3.9-1.3 4.6-3.3l2-6c.4-1.3 1.3-2.4 2.4-3.1l1.6-1c1.1-.7 1.9-1.7 2.3-2.8l2.2-5.7c.5-1.4 1.6-2.5 2.9-3.2l.4-.3c2.4-1.2 5.2-.7 7 1.2l.8.9c1.1 1.1 1.6 2.6 1.6 4.1v1.7c0 1.8.8 3.6 2.3 4.7l.4.3c.9.7 1.6 1.7 2 2.8l1.4 4.2c.6 1.8 2 3.2 3.7 3.8 0 0 4.1 1.7 4.8 1.7H44"
      style={{
        fill: "none",
        stroke,
        strokeWidth: 5,
      }}
    />
  </svg>
);

export default SingleTile;
