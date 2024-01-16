import { ApiData, ApiPlantDetails } from "@/types/api";
import fetchData from "./fetchData";
import PlantConverter from "./PlantConverter";
import UserModel from "@/models/UserModel";
import jsonwebtoken from "jsonwebtoken";
import User from "@/types/User";
import connectToDatabase from "./database";

export async function getPlants(query: string, page: number = 1) {
  const apiUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&q=${query}`;
  const payload = await fetchData<ApiData>(apiUrl);

  return payload ? PlantConverter.convertToPlants(payload) : [];
}

export async function getPlantById(id: number) {
  const apiUrl = `https://perenual.com/api/species/details/${id}?key=${process.env.API_KEY}`;
  const payload = await fetchData<ApiPlantDetails>(apiUrl);

  return payload ? PlantConverter.convertToPlant(payload) : null;
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
