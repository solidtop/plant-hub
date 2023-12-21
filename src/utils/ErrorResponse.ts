import HttpStatus from "@/enums/HttpStatus";
import ApiErrorResponse from "@/types/ApiErrorResponse";
import { NextResponse } from "next/server";

export default class ErrorResponse {
  message: string;
  status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    this.message = message;
    this.status = status;
  }

  static create(message: string, status: HttpStatus) {
    const timestamp = new Date().toLocaleString();

    const errorResponse: ApiErrorResponse = {
      error: {
        message,
        status,
        timestamp,
      },
    };

    return NextResponse.json(errorResponse, { status });
  }
}
