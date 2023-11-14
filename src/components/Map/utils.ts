const originalDimentions = {
  width: 1920,
  height: 1080,
};

function getCroppedDimensions(displayDimentions: {
  width: number;
  height: number;
}) {
  const originalRatio = originalDimentions.width / originalDimentions.height;
  const displayRatio = displayDimentions.width / displayDimentions.height;
  let { width } = originalDimentions;
  let { height } = originalDimentions;

  if (originalRatio < displayRatio) {
    height = width / displayRatio;
  } else if (originalRatio > displayRatio) {
    width = height * displayRatio;
  }

  return { width, height };
}

const originalEdges = {
  top: 35.367654,
  bottom: 12.496451,
  left: 19.362038,
  right: 68.668845,
};

const originalHeigthPixel = (originalEdges.top - originalEdges.bottom) / 1080;
const originalWidthPixel = (originalEdges.right - originalEdges.left) / 1920;

export const getTransformedEdges = (displayDimentions: {
  width: number;
  height: number;
}) => {
  const { width, height } = getCroppedDimensions(displayDimentions);

  if (
    width === originalDimentions.width &&
    height === originalDimentions.height
  ) {
    return originalEdges;
  }
  if (width === originalDimentions.width) {
    const croppedHeight = Math.abs(originalDimentions.height - height) / 2;

    return {
      ...originalEdges,
      top: originalEdges.top - croppedHeight * originalHeigthPixel,
      bottom: originalEdges.bottom + croppedHeight * originalHeigthPixel,
    };
  }

  const croppedWidth = Math.abs(originalDimentions.width - width) / 2;

  return {
    ...originalEdges,
    left: originalEdges.left + croppedWidth * originalWidthPixel,
    right: originalEdges.right - croppedWidth * originalWidthPixel,
  };
};

export const getPixelCoordinates = (displayDimentions: {
  width: number;
  height: number;
}) => {
  const edges = getTransformedEdges(displayDimentions);
  const heigthPixel = (edges.top - edges.bottom) / displayDimentions.height;
  const widthPixel = (edges.right - edges.left) / displayDimentions.width;

  return {
    heigthPixel,
    widthPixel,
  };
};

export const getRelativeCoordinates = (
  displayDimentions: {
    width: number;
    height: number;
  },
  coordinates: {
    height: number;
    width: number;
  }
) => {
  const edges = getTransformedEdges(displayDimentions);

  const { heigthPixel, widthPixel } = getPixelCoordinates(displayDimentions);

  return {
    widthPixel: (coordinates.width - edges.left) / widthPixel,
    heigthPixel: (edges.top - coordinates.height) / heigthPixel,
  };
};
