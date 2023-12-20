import { FC } from "react";

type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({ type, onClick, children }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
