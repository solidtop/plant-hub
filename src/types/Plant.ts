import { DefaultImage } from "./DefaultImage";

export type Plant = {
  id: number;
  commonName: string;
  scientificName: string[];
  otherName: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  defaulImage: DefaultImage;
};
