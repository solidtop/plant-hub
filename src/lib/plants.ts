"use server";

import { ApiData, ApiPlantDetails } from "@/types/api";
import { PlantSummary } from "@/types/plant";
import PlantConverter from "@/utils/PlantConverter";
import fetchData from "@/utils/fetchData";
import { cookies } from "next/headers";
import { getUser } from "./users";

export async function getPlants(query: string = "", page: number = 1) {
  const apiUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&q=${query}&page=${page}&order=asc`;
  const payload = await fetchData<ApiData>(apiUrl);

  return payload ? PlantConverter.convertToPlants(payload) : [];
}

export async function getIndoorPlants() {
  const apiUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&indoor=1`;
  const payload = await fetchData<ApiData>(apiUrl);

  return payload ? PlantConverter.convertToPlants(payload) : [];
}

export async function getPlantById(id: number) {
  const apiUrl = `https://perenual.com/api/species/details/${id}?key=${process.env.API_KEY}`;
  const payload = await fetchData<ApiPlantDetails>(apiUrl);

  return payload ? PlantConverter.convertToPlant(payload) : null;
}

export async function getPlantsByIds(
  ids: number[],
  page: number = 1,
  pageSize: number = 10
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const batchIds = ids.slice(start, end);

  const promises = batchIds.map(async (id) => {
    const plant = await fetchData<ApiPlantDetails>(
      `https://perenual.com/api/species/details/${id}?key=${process.env.API_KEY}`
    );

    return plant;
  });

  const payloads = await Promise.all(promises);

  const plants = payloads.map((payload) =>
    payload ? PlantConverter.convertDetailsToSummary(payload) : null
  );

  return plants.filter((plant) => plant !== null) as PlantSummary[];
}

export async function getMyPlants(page: number = 1) {
  const jwt = cookies().get("token")?.value;
  const user = await getUser(jwt);
  const myPlants = user ? await getPlantsByIds(user.plantIds, page) : [];
  return myPlants;
}

export async function getMyPlantIds() {
  const jwt = cookies().get("token")?.value;
  const user = await getUser(jwt);
  return user ? user.plantIds : [];
}

export async function isInCollection(plantId: number) {
  const jwt = cookies().get("token")?.value;
  const user = await getUser(jwt);
  return user ? user.plantIds.includes(plantId) : false;
}
