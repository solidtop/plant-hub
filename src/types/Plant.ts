import DefaultImage from "./DefaultImage";

type Plant = {
  id: number;
  commonName: string;
  scientificName: string[];
  otherName: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  defaulImage: DefaultImage;
};

export default Plant;
