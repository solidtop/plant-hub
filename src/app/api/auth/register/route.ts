import { NextRequest, NextResponse } from "next/server";
import { registerFormSchema } from "@/utils/validations";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import ValidationErrorResponse from "@/responses/ValidationErrorResponse";
import ErrorResponse from "@/responses/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";
import UserModel from "@/models/UserModel";
import connectToDatabase from "@/utils/database";
import UserDTO from "@/types/UserDTO";
import RegisterRequest from "@/types/RegisterRequest";
import User from "@/types/User";
import UserConverter from "@/utils/UserConverter";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const registerRequest: RegisterRequest = await req.json();
  const result = registerFormSchema.safeParse(registerRequest);

  if (!result.success) {
    return ValidationErrorResponse.create<RegisterRequest>(result.error);
  }

  const { username, password, firstName, lastName } = result.data;

  const usernameExists = await UserModel.exists({ username });
  if (usernameExists) {
    return ErrorResponse.create(
      "Username is already taken",
      HttpStatus.BAD_REQUEST
    );
  }

  const passwordHash = await bcrypt.hash(password, 5);
  const user = new UserModel({
    username,
    password: passwordHash,
    firstName,
    lastName,
  }) as User;

  await user.save();

  const key = process.env.JWT_KEY as string;
  const jwt = jsonwebtoken.sign({ userId: user.toJSON()._id }, key);

  const userDTO = UserConverter.convertToDTO(user);
  const res = NextResponse.json(userDTO);
  res.cookies.set("token", jwt);

  return res;
}
