export type ApiData = {
  data: ApiPlant[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
};

type ApiPlant = {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image: ApiDefaultImage | null;
};

type ApiDefaultImage = {
  license: number;
  license_name: string;
  license_url: string;
  original_url: string;
  regular_url: string;
  medium_url: string;
  small_url: string;
  thumbnail: string;
};

export type ApiPlantDetails = {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family: null;
  origin: string[];
  type: string;
  dimensions: ApiDimensions;
  cycle: string;
  attracts: string[];
  propagation: string[];
  hardiness: ApiHardiness;
  hardiness_location: ApiHardinessLocation;
  watering: string;
  depth_water_requirement: string[];
  volume_water_requirement: string[];
  watering_period: null;
  watering_general_benchmark: ApiWateringGeneralBenchmark;
  plant_anatomy: string[];
  sunlight: string[];
  pruning_month: string[];
  pruning_count: string[];
  seeds: number;
  maintenance: null;
  care_guides: string;
  soil: string[];
  growth_rate: string;
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  tropical: boolean;
  indoor: boolean;
  care_level: string;
  pest_susceptibility: string[];
  pest_susceptibility_api: string;
  flowers: boolean;
  flowering_season: null;
  flower_color: string;
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  edible_fruit_taste_profile: string;
  fruit_nutritional_value: string;
  fruit_color: string[];
  harvest_season: null;
  leaf: boolean;
  leaf_color: string[];
  edible_leaf: boolean;
  cuisine: boolean;
  medicinal: boolean;
  poisonous_to_humans: number;
  poisonous_to_pets: number;
  description: string;
  default_image: ApiDefaultImage;
  other_images: string;
};

type ApiDimensions = {
  type: string;
  min_value: number;
  max_value: number;
  unit: string;
};

type ApiHardiness = {
  min: number;
  max: number;
};

type ApiHardinessLocation = {
  full_url: string;
  full_iframe: "string";
};

type ApiWateringGeneralBenchmark = {
  value: string;
  unit: string;
};
