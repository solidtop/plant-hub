import { Dispatch, FC, SetStateAction } from "react";
import InputField from "./InputField";

type PasswordInputProps = {
  label?: string;
  id?: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  errorMessage?: string;
};

const PasswordField: FC<PasswordInputProps> = ({
  label = "Password",
  id = "password",
  password,
  setPassword,
  errorMessage,
}) => {
  return (
    <InputField
      type="password"
      label={label}
      id={id}
      placeholder="Enter your Password"
      value={password}
      setValue={setPassword}
      errorMessage={errorMessage}
    />
  );
};

export default PasswordField;
