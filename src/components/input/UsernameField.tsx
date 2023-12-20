import { Dispatch, FC, SetStateAction } from "react";
import InputField from "./InputField";

type UsernameFieldProps = {
  label?: string;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  errorMessage: string;
};

const UsernameField: FC<UsernameFieldProps> = ({
  label = "Username",
  username,
  setUsername,
  errorMessage,
}) => {
  return (
    <InputField
      type="text"
      label={label}
      id="username"
      placeholder="Enter your username"
      value={username}
      setValue={setUsername}
      errorMessage={errorMessage}
    />
  );
};

export default UsernameField;
