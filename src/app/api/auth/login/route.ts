import { NextRequest, NextResponse } from "next/server";
import { loginFormSchema } from "@/utils/validations";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import ErrorResponse from "@/utils/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";
import ValidationError from "@/utils/ValidationError";
import UserModel from "@/models/UserModel";
import connectToDatabase from "@/utils/database";
import UserDto from "@/types/UserDto";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  const result = loginFormSchema.safeParse(body);

  if (!result.success) {
    return ValidationError.create(result.error);
  }

  const { username, password } = result.data;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return badRequest();
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return badRequest();
  }

  const key = process.env.JWT_KEY as string;
  const jwt = jsonwebtoken.sign({ userId: user.toJSON()._id }, key);

  const userDto: UserDto = {
    id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const res = NextResponse.json(userDto);
  res.cookies.set("token", jwt);

  return res;
}

function badRequest() {
  return ErrorResponse.create(
    "Incorrect username or password",
    HttpStatus.BAD_REQUEST
  );
}
