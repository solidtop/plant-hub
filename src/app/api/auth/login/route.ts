import { NextRequest, NextResponse } from "next/server";
import { loginFormSchema } from "@/utils/validations";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import ErrorResponse from "@/responses/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";
import UserModel from "@/models/UserModel";
import connectToDatabase from "@/utils/database";
import ValidationErrorResponse from "@/responses/ValidationErrorResponse";
import { LoginRequest } from "@/types/request";
import { User } from "@/types/user";
import UserConverter from "@/utils/UserConverter";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const loginRequest: LoginRequest = await req.json();
  const result = loginFormSchema.safeParse(loginRequest);

  if (!result.success) {
    return ValidationErrorResponse.create<LoginRequest>(result.error);
  }

  const { username, password } = result.data;

  const user = (await UserModel.findOne({ username })) as User;
  if (!user) {
    return badRequest();
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return badRequest();
  }

  const key = process.env.JWT_KEY as string;
  const jwt = jsonwebtoken.sign({ userId: user.toJSON()._id }, key);

  const userDTO = UserConverter.convertToDTO(user);
  const res = NextResponse.json(userDTO);
  res.cookies.set("token", jwt);

  return res;
}

function badRequest() {
  return ErrorResponse.create(
    "Incorrect username or password",
    HttpStatus.BAD_REQUEST
  );
}
