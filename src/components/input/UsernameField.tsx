import { Dispatch, FC, SetStateAction } from "react";
import InputField from "./InputField";
import Image from "next/image";
import UsernameIcon from "/public/icons/username-icon.svg";

type UsernameFieldProps = {
  label?: string;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  errorMessage?: string;
};

const UsernameField: FC<UsernameFieldProps> = ({
  label = "Username",
  username,
  setUsername,
  errorMessage,
}) => {
  return (
    <div className="relative">
      <InputField
        type="text"
        label={label}
        id="username"
        placeholder="Enter your username"
        value={username}
        setValue={setUsername}
        errorMessage={errorMessage}
      />
      <Image
        src={UsernameIcon}
        width={20}
        height={20}
        alt="Username icon"
        className="absolute left-3 top-12"
      />
    </div>
  );
};

export default UsernameField;
