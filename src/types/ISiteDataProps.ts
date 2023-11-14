export type TSiteDataProps = {
  infos : {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    loadingImage: string;
    image: {
      placeholder: string;
      url: string;
    }
  };
  photos : {
    id: number;
    name: string;
    names: string[];
    modals: {
      title:string;
      text:string;
      image:string | null;
      position:number[];
    }[];
    positions: number[][];
    nextCameraPositions: number[][];
    url: string;
    urlLQ: string;
    links: number[];
    cameraPosition: number[];
  }[]
};
