import HttpStatus from "@/enums/HttpStatus";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

class ValidationError {
  static create(error: ZodError): NextResponse<ValidationError> {
    const errors = error.errors.map((error) => ({
      field: error.path[0],
      message: error.message,
    }));

    return NextResponse.json({ errors }, { status: HttpStatus.BAD_REQUEST });
  }
}

export default ValidationError;
