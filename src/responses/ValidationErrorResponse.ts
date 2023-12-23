import HttpStatus from "@/enums/HttpStatus";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import ValidationError from "./ValidationError";

class ValidationErrorResponse {
  static create<T>(zodError: ZodError) {
    const validationError = new ValidationError<T>(zodError);

    return NextResponse.json(validationError, {
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export default ValidationErrorResponse;
