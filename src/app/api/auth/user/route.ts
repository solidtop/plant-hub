import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "@/responses/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";
import connectToDatabase from "@/utils/database";
import UserDto from "@/types/UserDto";
import { getUser } from "@/utils/api";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const jwt = req.cookies.get("token")?.value;

  if (!jwt) {
    return new NextResponse(null, { status: HttpStatus.UNAUTHORIZED });
  }

  const user = await getUser(jwt);
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
}
