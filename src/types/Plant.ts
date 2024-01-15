export type PlantSummary = {
  id: number;
  commonName: string;
  watering: string;
  sunlight: string[];
  imageUrl: string | null;
};

export type PlantDetails = {
  id: number;
  commonName: string;
  scientificName: string[];
  cycle: string;
  sunlight: string[];
  careLevel: string;
  hardiness: Hardiness;
  growthRate: string;
  imageUrl: string | null;
};

type Hardiness = {
  min: number;
  max: number;
};
