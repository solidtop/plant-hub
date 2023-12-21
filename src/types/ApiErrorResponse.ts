import HttpStatus from "@/enums/HttpStatus";

type ApiErrorResponse = {
  error: {
    message: string;
    status: HttpStatus;
    timestamp: string;
  };
};

export default ApiErrorResponse;
