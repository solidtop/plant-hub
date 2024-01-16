import { PlantSummary, PlantDetails } from "@/types/plant";
import { ApiData, ApiPlantDetails } from "@/types/api";

class PlantConverter {
  static convertToPlants(payload: ApiData): PlantSummary[] {
    return payload.data.map((plant) => ({
      id: plant.id,
      commonName: plant.common_name,
      watering: plant.watering,
      sunlight: plant.sunlight,
      imageUrl: plant.default_image ? plant.default_image.original_url : null,
    }));
  }

  static convertToPlant(plant: ApiPlantDetails): PlantDetails {
    return {
      id: plant.id,
      commonName: plant.common_name,
      scientificName: plant.scientific_name,
      description: plant.description,
      cycle: plant.cycle,
      sunlight: plant.sunlight,
      watering: plant.watering,
      careLevel: plant.care_level,
      hardiness: plant.hardiness,
      growthRate: plant.growth_rate,
      imageUrl: plant.default_image ? plant.default_image.original_url : null,
    };
  }
}

export default PlantConverter;
