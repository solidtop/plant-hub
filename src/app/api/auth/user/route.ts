import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "@/utils/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";
import jsonwebtoken from "jsonwebtoken";

type Payload = {
  userId: string;
};

export async function GET(req: NextRequest) {
  const jwt = req.cookies.get("token")?.value;
  if (!jwt) {
    return unauthorized();
  }

  try {
    const key = process.env.JWT_KEY as string;
    const payload = jsonwebtoken.verify(jwt, key) as Payload;
    const userId = payload.userId;
    const user = await findById(userId);
    if (!user) {
      return ErrorResponse.create("user not found", HttpStatus.NOT_FOUND);
    }

    return NextResponse.json({
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    return unauthorized();
  }
}

function unauthorized() {
  return new NextResponse(null, { status: HttpStatus.UNAUTHORIZED });
}

// Placeholder
async function findById(id: String) {
  return {
    _id: "1",
    username: "solidtop",
    firstName: "Axel",
    lastName: "Asp",
  };
}
