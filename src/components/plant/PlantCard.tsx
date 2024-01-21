"use client";

import { PlantSummary } from "@/types/plant";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import InfoIcon from "/public/icons/info-solid.svg";
import SunIcon from "/public/icons/sun-icon.png";
import WaterIcon from "/public/icons/water-icon.png";
import CareIcon from "/public/icons/care-icon.png";
import PlantStat from "./PlantStat";
import InCollectionLabel from "../InCollectionLabel";
import Link from "next/link";
import PlantToggle from "./PlantToggle";
import ImageNotFound from "/public/images/imagenotfound.png";
import CircleButton from "../button/CircleButton";

type CardState = {
  loggedIn: boolean;
  inCollection: boolean;
};

type PlantCardProps = {
  id: number;
  plant: PlantSummary;
  state: CardState;
  onToggle?: () => void;
};

const PlantCard: FC<PlantCardProps> = ({
  id,
  plant,
  state,
  onToggle = () => {},
}) => {
  const [inCollection, setInCollection] = useState(state.inCollection);

  useEffect(() => {
    setInCollection(state.inCollection);
  }, [state.inCollection]);

  return (
    <li
      id={id.toString()}
      className="relative flex flex-col my-6 p-4 bg-accent-color bg-opacity-20 rounded-lg backdrop-blur-md shadow-md shadow-black-trans"
    >
      <Link href={`/plants/${id}`} className="absolute inset-0 z-10" />

      <div className="relative">
        {plant.imageUrl ? (
          <Image
            src={plant.imageUrl}
            width={300}
            height={300}
            alt="Plant image"
            className="w-full h-48 object-cover object-bottom rounded-lg"
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

        <CircleButton
          icon={InfoIcon}
          alt="Info icon"
          iconWidth={8}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        />
      </div>

      <h3 className="my-2 capitalize">{plant.commonName}</h3>

      <ul className="flex flex-col gap-2">
        <PlantStat key={1} icon={SunIcon} labels={plant.sunlight} size={20} />
        <PlantStat key={2} icon={WaterIcon} label={plant.watering} size={20} />
        <PlantStat key={3} icon={CareIcon} label="Not available" size={20} />
      </ul>

      {state.loggedIn && (
        <PlantToggle
          plantId={id}
          inCollection={state.inCollection}
          onToggle={(active: boolean) => {
            setInCollection(active);
            onToggle();
          }}
          className="self-end"
        />
      )}
    </li>
  );
};

export default PlantCard;
