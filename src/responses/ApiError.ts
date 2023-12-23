import HttpStatus from "@/enums/HttpStatus";

type Error = {
  message: string;
  status: HttpStatus;
  timestamp: string;
};

class ApiError {
  error: Error;

  constructor(message: string, status: HttpStatus) {
    const timestamp = new Date().toLocaleString();

    this.error = {
      message,
      status,
      timestamp,
    };
  }
}

export default ApiError;
