import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ErrorResponse from "@/utils/ErrorResponse";
import HttpStatus from "@/enums/HttpStatus";

export function POST() {
  const jwt = cookies().get("token")?.value;
  if (!jwt) {
    return ErrorResponse.create("Missing JWT token", HttpStatus.UNAUTHORIZED);
  }

  const res = new NextResponse();
  res.cookies.delete("token");
  return res;
}
