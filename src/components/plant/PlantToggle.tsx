import { FC, useEffect, useState } from "react";
import SecondaryButton from "../button/SecondaryButton";
import PlusIcon from "/public/icons/plus-solid.svg";
import XMarkIcon from "/public/icons/xmark-solid.svg";
import Image from "next/image";
import HttpMethod from "@/enums/HttpMethod";
import fetchData from "@/utils/fetchData";
import ApiError from "@/responses/ApiError";

type PlantToggleProps = {
  plantId: number;
  inCollection: boolean;
  onToggle: (active: boolean) => void;
  className?: string;
};

const PlantToggle: FC<PlantToggleProps> = ({
  plantId,
  inCollection,
  onToggle,
  className = "",
}) => {
  const [active, setActive] = useState(inCollection);

  useEffect(() => {
    setActive(inCollection);
  }, [inCollection]);

  const handleToggle = async () => {
    setActive((active) => !active);
    onToggle(!active);

    let payload;

    if (active) {
      payload = await fetchData<ApiError>(
        `/api/my-plants/${plantId}`,
        HttpMethod.DELETE
      );
    } else {
      payload = await fetchData<ApiError>("/api/my-plants", HttpMethod.POST, {
        plantId,
      });
    }

    if (payload && payload?.error) {
      setActive((active) => !active);
    }
  };

  return (
    <SecondaryButton
      onClick={handleToggle}
      className={`z-20 gap-2 ${
        active ? "bg-primary-color/100" : ""
      } ${className}`}
    >
      {active ? (
        <>
          Remove
          <Image
            src={XMarkIcon}
            width={15}
            height={15}
            alt="X mark icon"
            className="w-auto h-auto"
          />
        </>
      ) : (
        <>
          Add
          <Image
            src={PlusIcon}
            width={15}
            height={15}
            alt="Plus icon"
            className="w-auto h-auto"
          />
        </>
      )}
    </SecondaryButton>
  );
};

export default PlantToggle;
