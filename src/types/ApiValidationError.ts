type ApiValidationError = {
  errors: {
    field: string | number;
    message: string;
  }[];
};

export default ApiValidationError;
