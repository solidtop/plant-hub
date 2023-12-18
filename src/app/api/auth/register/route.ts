import { NextRequest, NextResponse } from "next/server";
import { registerFormSchema } from "@/utils/validations";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import ValidationError from "@/utils/ValidationError";
import ErrorResponse from "@/utils/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = registerFormSchema.safeParse(body);

  if (!result.success) {
    return ValidationError.create(result.error);
  }

  const { username, password, firstName, lastName } = result.data;

  const usernameExists = await exists({ username });
  if (usernameExists) {
    return ErrorResponse.create(
      "Username is already taken",
      HttpStatus.BAD_REQUEST
    );
  }

  const passwordHash = await bcrypt.hash(password, 5);
  const user = new UserModel({
    username,
    passwordHash,
    firstName,
    lastName,
  });

  await user.save();

  const key = process.env.JWT_KEY as string;
  const jwt = jsonwebtoken.sign({ sub: user.toJSON()._id }, key);

  const res = NextResponse.json({
    id: user._id,
    username,
    firstName,
    lastName,
  });

  res.cookies.set("token", jwt);

  return res;
}

// Placeholder
async function exists(data: { username: string }): Promise<boolean> {
  return data.username === "solidtop" ? true : false;
}

class UserModel {
  data: Object;
  _id: string = "1";

  constructor(data: Object) {
    this.data = data;
  }

  async save() {}
  toJSON() {
    return {
      _id: this._id,
      username: "user",
      firstName: "user",
      lastName: "",
    };
  }
}
