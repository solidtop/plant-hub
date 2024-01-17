import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "@/responses/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";
import connectToDatabase from "@/utils/database";
import { getUser } from "@/utils/api";
import UserConverter from "@/utils/UserConverter";

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

  const userDTO = UserConverter.convertToDTO(user);

  return NextResponse.json(userDTO);
}
