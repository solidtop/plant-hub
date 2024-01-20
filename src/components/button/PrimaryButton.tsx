import { FC } from "react";

type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
  type,
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center items-center w-32 h-14 rounded-md text-xl bg-primary-color bg-opacity-40 border-2 border-primary-color ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
