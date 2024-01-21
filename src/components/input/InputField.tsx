import { Dispatch, FC, HTMLInputTypeAttribute, SetStateAction } from "react";
import ErrorMessage from "./ErrorMessage";

type InputFieldProps = {
  type: HTMLInputTypeAttribute;
  label: string;
  optional?: boolean;
  id: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  errorMessage?: string;
};

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  optional,
  id,
  placeholder,
  value,
  setValue,
  errorMessage = "",
}) => {
  return (
    <>
      <label htmlFor={id}>
        {label}
        {optional && <i className="text-sm"> - Optional</i>}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        className="w-full my-2 pl-12 pr-4 py-3 text-lg bg-primary-color rounded-md autofill:bg-none"
      />
      {errorMessage && (
        <ErrorMessage htmlFor={id} message={errorMessage} className="my-2" />
      )}
    </>
  );
};

export default InputField;
