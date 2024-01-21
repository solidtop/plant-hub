import { FC } from "react";
import CircleButton from "../button/CircleButton";
import InfoIcon from "/public/icons/info-solid.svg";
import CaretIcon from "/public/icons/caret-icon.svg";
import Image from "next/image";

const PlantDetailsButton: FC = () => {
  return (
    <>
      <Image
        src={CaretIcon}
        width={9}
        height={15}
        alt="Caret icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
      />
      <CircleButton
        icon={InfoIcon}
        alt="Info icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
      />
    </>
  );
};

export default PlantDetailsButton;
