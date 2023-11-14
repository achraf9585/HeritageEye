export type TSitesProps = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: {
    placeholder: string;
    url: string;
  };
  link: string;
  pinImage: string;
  cardImage: string;
  videoLink: string;
  geolaction: {
    latitude: number;
    longitude: number;
  };
}[];
