import { FC } from "react";
import PrimaryButton from "./PrimaryButton";
import PlusIcon from "/public/icons/plus-solid.svg";
import XMarkIcon from "/public/icons/xmark-solid.svg";
import Image from "next/image";

type TogglePlantButtonProps = {
  active: boolean;
  onClick: () => void;
};

const TogglePlantButton: FC<TogglePlantButtonProps> = ({ active, onClick }) => {
  return (
    <PrimaryButton
      onClick={onClick}
      className={`z-20 gap-2 self-end ${active ? "bg-opacity-100" : ""}`}
    >
      {active ? (
        <>
          Owned
          <Image src={XMarkIcon} width={15} height={15} alt="X mark icon" />
        </>
      ) : (
        <>
          Add
          <Image src={PlusIcon} width={15} height={15} alt="Plus icon" />
        </>
      )}
    </PrimaryButton>
  );
};

export default TogglePlantButton;
