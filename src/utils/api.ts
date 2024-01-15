import { ApiPlantDetails } from "@/types/api";
import fetchData from "./fetchData";
import PlantConverter from "./PlantConverter";

export async function getPlantById(id: number) {
  const apiUrl = `https://perenual.com/api/species/details/${id}?key=${process.env.API_KEY}`;
  const payload = await fetchData<ApiPlantDetails>(apiUrl);

  return payload ? PlantConverter.convertToPlant(payload) : null;
}
