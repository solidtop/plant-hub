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
      className={`min-w-[100px] min-h-[50px] flex justify-center items-center text-xl rounded-md bg-secondary-color ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
