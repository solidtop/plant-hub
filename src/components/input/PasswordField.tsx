import { Dispatch, FC, SetStateAction } from "react";
import InputField from "./InputField";
import PasswordIcon from "/public/icons/password-icon.svg";
import Image from "next/image";

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
    <div className="relative">
      <InputField
        type="password"
        label={label}
        id={id}
        placeholder="Enter your Password"
        value={password}
        setValue={setPassword}
        errorMessage={errorMessage}
      />
      <Image
        src={PasswordIcon}
        width={20}
        height={20}
        alt="Password icon"
        className="absolute left-3 top-11"
      />
    </div>
  );
};

export default PasswordField;
