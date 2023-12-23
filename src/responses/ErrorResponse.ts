import HttpStatus from "@/enums/HttpStatus";
import { NextResponse } from "next/server";
import ApiError from "./ApiError";

class ErrorResponse {
  static create(message: string, status: HttpStatus) {
    const apiError = new ApiError(message, status);
    return NextResponse.json(apiError, { status });
  }
}

export default ErrorResponse;
