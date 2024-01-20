"use server";

import { ApiData, ApiPlantDetails } from "@/types/api";
import fetchData from "./fetchData";
import PlantConverter from "./PlantConverter";
import UserModel from "@/models/UserModel";
import jsonwebtoken from "jsonwebtoken";
import User from "@/types/User";
import connectToDatabase from "./database";
import { PlantSummary } from "@/types/plant";
import UserConverter from "./UserConverter";
import { cookies } from "next/headers";

export async function getPlants(query: string = "", page: number = 1) {
  const apiUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&q=${query}&page=${page}`;
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

type TokenPayload = {
  userId: string;
};

export async function getUser(jwt: string | undefined) {
  if (!jwt) {
    return null;
  }

  await connectToDatabase();

  try {
    const key = process.env.JWT_KEY as string;
    const payload = jsonwebtoken.verify(jwt, key) as TokenPayload;
    const userId = payload.userId;
    const user = (await UserModel.findById(userId)) as User;
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserDTO(jwt: string | undefined) {
  const user = await getUser(jwt);
  return user ? UserConverter.convertToDTO(user) : null;
}
