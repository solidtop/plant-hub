import { NextRequest, NextResponse } from "next/server";
import { loginFormSchema } from "@/utils/validations";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = loginFormSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.errors.map((error) => {
      return {
        field: error.path[0],
        message: error.message,
      };
    });

    return NextResponse.json(errors, { status: 401 });
  }

  const { username, password } = result.data;
  const user = await findOne({ username });
  const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
  if (!user || !passwordsMatch) {
    return NextResponse.json(
      { error: "Incorrect username or password" },
      { status: 401 }
    );
  }

  const key = process.env.JWT_KEY as string;
  const jwt = jsonwebtoken.sign({ sub: user.toJSON()._id }, key);

  const res = NextResponse.json({
    id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  res.cookies.set("token", jwt);

  return res;
}

// Placeholder
async function findOne(data: { username: string }): Promise<{
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  toJSON: () => { _id: string };
}> {
  const username = data.username;
  const passwordHash = await bcrypt.hash("password", 5);

  return {
    _id: "1",
    username,
    firstName: "Axel",
    lastName: "Asp",
    passwordHash,
    toJSON: () => {
      return { _id: "1" };
    },
  };
}
