"use client";

import { FC, FormEvent, useState } from "react";
import UsernameField from "../input/UsernameField";
import PasswordField from "../input/PasswordField";
import PrimaryButton from "../button/PrimaryButton";
import useUser from "@/hooks/useUser";
import { loginFormSchema } from "@/utils/validations";
import ValidationError from "@/responses/ValidationError";
import LoginRequest from "@/types/LoginRequest";
import ErrorMessage from "../input/ErrorMessage";
import SecondaryLink from "../link/SecondaryLink";
import Spinner from "../Spinner";

const LoginForm: FC = () => {
  const { login, loading } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] =
    useState<ValidationError<LoginRequest> | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setValidationError(null);
    setErrorMessage("");

    const result = loginFormSchema.safeParse({ username, password });

    if (!result.success) {
      const error = new ValidationError<LoginRequest>(result.error);
      setValidationError(error);
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

    window.location.replace("/");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col my-20 p-4 bg-accent-color/30 rounded-md backdrop-blur-md">
      <h1 className="mb-4 mx-auto">Login</h1>

      <form onSubmit={handleLogin} id="login-form">
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
        {errorMessage && (
          <ErrorMessage
            htmlFor="login-form"
            message={errorMessage}
            className="my-6"
          />
        )}

        <PrimaryButton type="submit" className="w-full my-8">
          Log in
        </PrimaryButton>

        <div className="flex justify-between items-center">
          <label>Don't have a account?</label>
          <SecondaryLink href="/signup">Sign up</SecondaryLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
