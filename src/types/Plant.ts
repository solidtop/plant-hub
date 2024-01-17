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
  description: string;
  scientificName: string[];
  description: string;
  cycle: string;
  sunlight: string[];
  watering: string;
  careLevel: string;
  hardiness: Hardiness;
  growthRate: string;
  imageUrl: string | null;
};

type Hardiness = {
  min: number;
  max: number;
};
