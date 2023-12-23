import { ZodError } from "zod";

type Field = {
  message: string;
};

class ValidationError<T> {
  errors: Record<keyof T, Field>;

  constructor(zodError: ZodError) {
    this.errors = {} as Record<keyof T, Field>;

    zodError.errors.forEach((error) => {
      const fieldName = error.path[0].toString() as keyof T;
      const errorMessage = error.message;

      this.errors[fieldName] = { message: errorMessage };
    });
  }
}

export default ValidationError;
