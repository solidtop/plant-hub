import DefaultImage from "./DefaultImage";

type Plant = {
  id: number;
  commonName: string;
  scientificName: string[];
  otherName: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  defaultImage: DefaultImage | null;
};

export default Plant;
