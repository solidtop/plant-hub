import HttpStatus from "@/enums/HttpStatus";
import ApiValidationError from "@/types/ApiValidationError";
import { NextResponse } from "next/server";
import { ZodError, ZodIssue } from "zod";

class ValidationError {
  static create(error: ZodError) {
    const errors = error.errors.map((error) => ({
      field: error.path[0],
      message: error.message,
    }));

    const errorResponse: ApiValidationError = {
      errors,
    };

    return NextResponse.json(errorResponse, { status: HttpStatus.BAD_REQUEST });
  }
}

export default ValidationError;
