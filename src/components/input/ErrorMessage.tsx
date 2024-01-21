import Image from "next/image";
import { FC } from "react";
import ExclamationMark from "/public/icons/exclamation-mark.svg";

type ErrorMessageProps = {
  htmlFor: string;
  message: string;
  className?: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({
  htmlFor,
  message,
  className = "",
}) => {
  return (
    <div
      className={`flex gap-4 px-4 py-2 bg-error-color rounded-full ${className}`}
    >
      <Image
        src={ExclamationMark}
        width={5}
        height={16}
        alt="Exclamation mark"
      />

      <label htmlFor={htmlFor}>{message}</label>
    </div>
  );
};

export default ErrorMessage;
