import { FC, FormEvent, useState } from "react";
import UsernameField from "../input/UsernameField";
import ValidationError from "@/responses/ValidationError";
import useUser from "@/hooks/useUser";
import RegisterRequest from "@/types/RegisterRequest";
import PasswordField from "../input/PasswordField";
import InputField from "../input/InputField";
import { registerFormSchema } from "@/utils/validations";
import PrimaryButton from "../button/PrimaryButton";

type RegisterFormProps = {
  onRegisterComplete: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ onRegisterComplete }) => {
  const { register } = useUser();
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

    onRegisterComplete();
  };

  return (
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
      <InputField
        type="text"
        label="First name"
        id="firstName"
        placeholder="Enter your first name"
        value={firstName}
        setValue={setFirstName}
        errorMessage={validationError?.errors?.firstName?.message}
      />
      <InputField
        type="text"
        label="Last name"
        id="lastName"
        placeholder="Enter your last name"
        value={lastName}
        setValue={setLastName}
        errorMessage={validationError?.errors?.firstName?.message}
      />
      <label htmlFor="register-form">{errorMessage}</label>

      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
  );
};

export default RegisterForm;
