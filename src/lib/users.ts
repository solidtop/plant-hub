import connectToDatabase from "@/utils/database";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "@/models/UserModel";
import { User } from "@/types/user";
import UserConverter from "@/utils/UserConverter";

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
