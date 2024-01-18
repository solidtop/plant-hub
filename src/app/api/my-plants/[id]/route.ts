import HttpStatus from "@/enums/HttpStatus";
import ErrorResponse from "@/responses/ErrorResponse";
import { getUser } from "@/utils/api";
import connectToDatabase from "@/utils/database";
import { isNumber } from "@/utils/validations";
import { NextRequest, NextResponse } from "next/server";

type RouteProps = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: RouteProps) {
  const jwt = req.cookies.get("token")?.value;

  if (!jwt) {
    return NextResponse.json(null, { status: HttpStatus.UNAUTHORIZED });
  }

  await connectToDatabase();

  const user = await getUser(jwt);

  if (!user) {
    return ErrorResponse.create("user not found", HttpStatus.NOT_FOUND);
  }

  const plantId = Number.parseInt(params.id);

  if (!isNumber(plantId)) {
    return ErrorResponse.create("invalid number", HttpStatus.BAD_REQUEST);
  }

  const plantIndex = user.plantIds.indexOf(plantId);
  if (plantIndex === -1) {
    return ErrorResponse.create(
      "plantId not found for the user",
      HttpStatus.NOT_FOUND
    );
  }

  user.plantIds.splice(plantIndex, 1);
  await user.save();

  return NextResponse.json(null);
}
