import { Dispatch, FC, SetStateAction } from "react";
import InputField from "./InputField";
import Image from "next/image";
import NameIcon from "/public/icons/name-icon.svg";

type NameFieldProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  errorMessage?: string;
};

const NameField: FC<NameFieldProps> = ({ name, setName, errorMessage }) => {
  return (
    <div className="relative">
      <InputField
        type="text"
        label="Name"
        optional={true}
        id="username"
        placeholder="Enter your name"
        value={name}
        setValue={setName}
        errorMessage={errorMessage}
      />
      <Image
        src={NameIcon}
        width={20}
        height={20}
        alt="Name icon"
        className="absolute left-3 top-12"
      />
    </div>
  );
};

export default NameField;
