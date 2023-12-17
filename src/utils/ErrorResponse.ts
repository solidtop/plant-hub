import HttpStatus from "@/enums/HttpStatus";
import { NextResponse } from "next/server";

export default class ErrorResponse {
  message: string;
  status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    this.message = message;
    this.status = status;
  }

  static create(message: string, status: HttpStatus): NextResponse {
    const timestamp = new Date().toLocaleString();

    return NextResponse.json(
      {
        message,
        status,
        timestamp,
      },
      { status }
    );
  }
}
