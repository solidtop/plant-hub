"use client";

import { PlantSummary } from "@/types/plant";
import Image from "next/image";
import { FC, useState } from "react";
import InfoIcon from "/public/icons/info-solid.svg";
import SunIcon from "/public/icons/sun-icon.png";
import WaterIcon from "/public/icons/water-icon.png";
import CareIcon from "/public/icons/care-icon.png";
import PlantStat from "./PlantStat";
import InCollectionLabel from "../InCollectionLabel";
import Link from "next/link";
import TogglePlantButton from "../button/TogglePlantButton";
import ImageNotFound from "/public/images/imagenotfound.png";
import fetchData from "@/utils/fetchData";
import HttpMethod from "@/enums/HttpMethod";
import ApiError from "@/responses/ApiError";

type PlantCardProps = {
  id: number;
  plant: PlantSummary;
  loggedIn: boolean;
  initInCollection: boolean;
};

const PlantCard: FC<PlantCardProps> = ({
  id,
  plant,
  loggedIn,
  initInCollection,
}) => {
  const [inCollection, setInCollection] = useState(initInCollection);

  const handleToggle = async () => {
    setInCollection((inCollection) => !inCollection);

    let payload;

    if (inCollection) {
      payload = await fetchData<ApiError>(
        `/api/my-plants/${id}`,
        HttpMethod.DELETE
      );
    } else {
      payload = await fetchData<ApiError>("/api/my-plants", HttpMethod.POST, {
        plantId: id,
      });
    }

    if (payload && payload?.error) {
      // Reset to previous state when there is an error
      setInCollection((inCollection) => !inCollection);
    }
  };

  return (
    <li
      id={id.toString()}
      className="relative flex flex-col my-6 p-4 bg-accent-color rounded-lg"
    >
      <Link href={`/plants/${id}`} className="absolute inset-0 z-10" />

      <div className="relative">
        {plant.imageUrl ? (
          <Image
            src={plant.imageUrl}
            width={300}
            height={300}
            alt="Plant image"
            className="w-full h-52 object-cover rounded-lg"
          />
        ) : (
          <Image
            src={ImageNotFound}
            width={300}
            height={300}
            alt="Image not found"
            className="w-full h-52 object-cover rounded-lg"
          />
        )}

        {inCollection && (
          <InCollectionLabel
            htmlFor={id.toString()}
            className="absolute top-2 left-2"
          />
        )}

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 p-1 bg-accent-color bg-opacity-30 rounded-full">
          <div className="w-full h-full flex justify-center items-center bg-primary-color rounded-full">
            <Image src={InfoIcon} width={8} height={21} alt="Info icon" />
          </div>
        </div>
      </div>

      <h3 className="my-2">{plant.commonName}</h3>

      <ul className="flex flex-col gap-2">
        <PlantStat key={1} icon={SunIcon} labels={plant.sunlight} size={20} />
        <PlantStat key={2} icon={WaterIcon} label={plant.watering} size={20} />
        <PlantStat key={3} icon={CareIcon} label="Not available" size={20} />
      </ul>

      {loggedIn && (
        <TogglePlantButton active={inCollection} onClick={handleToggle} />
      )}
    </li>
  );
};

export default PlantCard;
