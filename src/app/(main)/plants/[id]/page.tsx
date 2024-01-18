import PlantStat from "@/components/plant/PlantStat";
import { getPlantById } from "@/utils/api";
import { Metadata } from "next";
import Image from "next/image";
import CycleIcon from "/public/icons/cycle-icon.png";
import SunIcon from "/public/icons/sun-icon.png";
import WaterIcon from "/public/icons/water-icon.png";
import CareIcon from "/public/icons/care-icon.png";
import HardinessIcon from "/public/icons/hardiness-icon.png";
import GrowthIcon from "/public/icons/growth-icon.png";
import { PlantDetails } from "@/types/plant";
import BackLink from "@/components/link/BackLink";
import CollectionWrapper from "@/components/plant/details/CollectionWrapper";
import NoResults from "@/components/NoResults";

export const metadata: Metadata = {
  title: "Plant Details | Plant Hub",
};

type PlantDetailsProps = {
  params: {
    id: string;
  };
};

export default async function PlantDetails({ params }: PlantDetailsProps) {
  const { id } = params;
  const plantId = Number.parseInt(id);
  const plant = await getPlantById(plantId);

  if (!plant) {
    return <NoResults text="Plant not found" />;
  }

  const plantStats = initPlantStats(plant);

  return (
    <main>
      <section className="relative">
        {plant.imageUrl && (
          <Image
            src={plant.imageUrl}
            width={300}
            height={300}
            alt="Plant image"
            className="w-full h-52 object-cover"
          />
        )}

        <div className="absolute top-0 w-full h-52 bg-gradient-to-b from-black via-transparent to-black"></div>

        <BackLink className="absolute left-4 top-4" />

        <span className="absolute left-4 bottom-6">
          <h1>{plant.commonName}</h1>
          <h3 className="text-xl italic">{plant.scientificName}</h3>
        </span>

        <CollectionWrapper plantId={plantId} />
      </section>

      <div className="m-4 p-4 bg-accent-color bg-opacity-30 rounded-md">
        <ul className="flex flex-col gap-2">
          {plantStats.map((stat, index) => (
            <PlantStat
              key={index}
              icon={stat.icon}
              label={stat.label}
              labels={stat.labels}
            />
          ))}
        </ul>
      </div>

      <section className="p-4 mb-20">
        <h2 className="my-2">Description</h2>
        <p>{plant.description}</p>
      </section>
    </main>
  );
}

function initPlantStats(plant: PlantDetails) {
  return [
    {
      icon: CycleIcon,
      label: "Cycle: " + plant.cycle,
    },
    {
      icon: SunIcon,
      label: "Sunlight: ",
      labels: plant.sunlight,
    },
    {
      icon: WaterIcon,
      label: "Watering: " + plant.watering,
    },
    {
      icon: CareIcon,
      label: "Care Level: " + plant.careLevel,
    },
    {
      icon: HardinessIcon,
      label: `Hardiness Zone: ${plant.hardiness.min} - ${plant.hardiness.max}`,
    },
    {
      icon: GrowthIcon,
      label: "Growth Rate: " + plant.growthRate,
    },
  ];
}
