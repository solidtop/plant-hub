"use client";

import { FC, FormEvent, useState } from "react";
import UsernameField from "../input/UsernameField";
import ValidationError from "@/responses/ValidationError";
import useUser from "@/hooks/useUser";
import RegisterRequest from "@/types/RegisterRequest";
import PasswordField from "../input/PasswordField";
import InputField from "../input/InputField";
import { registerFormSchema } from "@/utils/validations";
import PrimaryButton from "../button/PrimaryButton";
import ErrorMessage from "../input/ErrorMessage";
import SecondaryLink from "../link/SecondaryLink";
import NameField from "../input/NameField";
import Spinner from "../Spinner";

const RegisterForm: FC = () => {
  const { register, loading } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [validationError, setValidationError] =
    useState<ValidationError<RegisterRequest> | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setValidationError(null);
    setErrorMessage("");

    const result = registerFormSchema.safeParse({
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
    });

    if (!result.success) {
      const error = new ValidationError<RegisterRequest>(result.error);
      setValidationError(error);
      return;
    }

    const payload = await register(
      username,
      password,
      confirmPassword,
      firstName,
      lastName
    );

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
    <div className="flex flex-col my-6 p-4 bg-accent-color/30 rounded-md backdrop-blur-md">
      <h1 className="mb-4 mx-auto">Sign up</h1>

      <form onSubmit={handleSubmit} id="register-form">
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
        <PasswordField
          label="Confirm password"
          id="confirmPassword"
          password={confirmPassword}
          setPassword={setConfirmPassword}
          errorMessage={validationError?.errors?.confirmPassword?.message}
        />
        <NameField name={firstName} setName={setFirstName} />
        {errorMessage && (
          <ErrorMessage
            htmlFor="register-form"
            message={errorMessage}
            className="my-6"
          />
        )}

        <PrimaryButton type="submit" className="w-full my-8">
          Sign up
        </PrimaryButton>

        <div className="flex justify-between items-center">
          <label>Already have a account?</label>
          <SecondaryLink href="/login">Log in</SecondaryLink>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
