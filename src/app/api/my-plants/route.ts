import HttpStatus from "@/enums/HttpStatus";
import ErrorResponse from "@/responses/ErrorResponse";
import { getUser } from "@/lib/users";
import connectToDatabase from "@/utils/database";
import { isNumber } from "@/utils/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const jwt = req.cookies.get("token")?.value;

  if (!jwt) {
    return NextResponse.json(null, { status: HttpStatus.UNAUTHORIZED });
  }

  await connectToDatabase();

  const user = await getUser(jwt);

  if (!user) {
    return ErrorResponse.create("user not found", HttpStatus.NOT_FOUND);
  }

  const body = await req.json();

  if (!isNumber(body.plantId)) {
    return ErrorResponse.create("invalid number", HttpStatus.BAD_REQUEST);
  }

  if (user.plantIds.includes(body.plantId)) {
    return ErrorResponse.create(
      "plantId already exists for the user",
      HttpStatus.BAD_REQUEST
    );
  }

  user.plantIds.push(body.plantId);
  await user.save();

  return NextResponse.json(null);
}
