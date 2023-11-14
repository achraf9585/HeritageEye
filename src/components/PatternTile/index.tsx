import React from "react";

import clsx from "helpers";

import SingleTile from "./SingleTiles";

const PatternTile = ({
  numberOfTiles,
  stroke,
  singleTileWidth,
  className,
}: {
  numberOfTiles: number;
  stroke: string;
  className?: string;
  singleTileWidth?: number;
}) => {
  return (
    <div className={clsx(className)}>
      <div className={`inline-grid grid-flow-col justify-start `}>
        {Array(numberOfTiles)
          .fill(0)
          .map((e, i) => (
            <SingleTile key={i} stroke={stroke} width={singleTileWidth} />
          ))}
      </div>
    </div>
  );
};

export default PatternTile;
