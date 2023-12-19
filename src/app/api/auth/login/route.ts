import { NextRequest, NextResponse } from "next/server";
import { loginFormSchema } from "@/utils/validations";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import ErrorResponse from "@/utils/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";
import ValidationError from "@/utils/ValidationError";
import User from "@/models/User";
import connectToDatabase from "@/utils/database";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  const result = loginFormSchema.safeParse(body);

  if (!result.success) {
    return ValidationError.create(result.error);
  }

  const { username, password } = result.data;

  const user = await User.findOne({ username });
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!user || !passwordsMatch) {
    return ErrorResponse.create(
      "Incorrect username or password",
      HttpStatus.BAD_REQUEST
    );
  }

  const key = process.env.JWT_KEY as string;
  const jwt = jsonwebtoken.sign({ userId: user.toJSON()._id }, key);

  const res = NextResponse.json({
    id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  res.cookies.set("token", jwt);

  return res;
}
