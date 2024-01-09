import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "@/responses/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "@/models/UserModel";
import connectToDatabase from "@/utils/database";
import UserDto from "@/types/UserDto";

type Payload = {
  userId: string;
};

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const jwt = req.cookies.get("token")?.value;
  if (!jwt) {
    return new NextResponse(null, { status: HttpStatus.NOT_FOUND });
  }

  try {
    const key = process.env.JWT_KEY as string;
    const payload = jsonwebtoken.verify(jwt, key) as Payload;
    const userId = payload.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return ErrorResponse.create("user not found", HttpStatus.NOT_FOUND);
    }

    const userDto: UserDto = {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return NextResponse.json(userDto);
  } catch (error) {
    return new NextResponse(null, { status: HttpStatus.UNAUTHORIZED });
  }
}
