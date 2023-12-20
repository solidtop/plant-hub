import { Dispatch, FC, HTMLInputTypeAttribute, SetStateAction } from "react";

type InputFieldProps = {
  type: HTMLInputTypeAttribute;
  label: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  errorMessage?: string;
};

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  id,
  placeholder,
  value,
  setValue,
  errorMessage,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
      <label htmlFor={id}>{errorMessage}</label>
    </div>
  );
};

export default InputField;
