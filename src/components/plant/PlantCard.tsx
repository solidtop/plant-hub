import Plant from "@/types/Plant";
import Image from "next/image";
import { FC } from "react";
import InfoIcon from "/public/icons/info-solid.svg";
import SunIcon from "/public/icons/sun-icon.png";
import WaterIcon from "/public/icons/water-icon.png";
import CareIcon from "/public/icons/care-icon.png";
import PlantStat from "./PlantStat";
import InCollectionLabel from "../InCollectionLabel";
import Link from "next/link";

type PlantCardProps = {
  id: number;
  plant: Plant;
  inCollection: boolean;
  children: React.ReactNode;
};

const PlantCard: FC<PlantCardProps> = ({
  id,
  plant,
  inCollection,
  children,
}) => {
  return (
    <li
      id={id.toString()}
      className="relative flex flex-col my-6 p-4 bg-accent-color rounded-lg"
    >
      <Link href={`/plants/${id}`} className="absolute inset-0 z-10" />

      <div className="relative">
        {plant.defaultImage ? (
          <Image
            src={plant.defaultImage.originalUrl}
            width={300}
            height={300}
            alt="Plant image"
            className="w-full h-52 object-cover rounded-lg"
          />
        ) : (
          <Image
            src="/public/images/imagenotfound.png"
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

      {children}
    </li>
  );
};

export default PlantCard;
