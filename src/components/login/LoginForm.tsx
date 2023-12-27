"use client";

import { FC, FormEvent, useState } from "react";
import UsernameField from "../input/UsernameField";
import PasswordField from "../input/PasswordField";
import PrimaryButton from "../button/PrimaryButton";
import useUser from "@/hooks/useUser";
import { loginFormSchema } from "@/utils/validations";
import ValidationError from "@/responses/ValidationError";
import ApiError from "@/responses/ApiError";
import { ZodFormattedError } from "zod";
import LoginRequest from "@/types/LoginRequest";

type LoginFormProps = {
  onLoginComplete: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ onLoginComplete }) => {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] =
    useState<ValidationError<LoginRequest> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setValidationError(null);
    setErrorMessage("");

    const result = loginFormSchema.safeParse({ username, password });
    if (!result.success) {
      const validationError = new ValidationError<LoginRequest>(result.error);
      setValidationError(validationError);
      return;
    }

    const payload = await login(username, password);
    if (!payload) {
      return;
    }

    if (payload.errors) {
      setValidationError(payload);
      return;
    } else if (payload.error) {
      setErrorMessage(payload.error.message);
      return;
    }

    onLoginComplete();
  };

  return (
    <form onSubmit={handleSubmit} id="login-form">
      <UsernameField
        username={username}
        setUsername={setUsername}
        errorMessage={validationError?.errors?.username?.message}
      />
      <PasswordField
        password={password}
        setPassword={setPassword}
        errorMessage={validationError?.errors?.password?.message}
      />
      <label htmlFor="login-form">{errorMessage}</label>

      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
  );
};

export default LoginForm;
