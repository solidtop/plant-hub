import { FC } from "react";
import PlantCard from "./PlantCard";
import { getPlants } from "@/utils/api";
import NoResults from "../NoResults";

type PlantListProps = {
  query?: string;
};

const PlantList: FC<PlantListProps> = async ({ query = "" }) => {
  const plants = await getPlants(query);

  if (plants.length == 0) {
    return <NoResults />;
  }

  return (
    <ul>
      {plants.map((plant) => (
        <PlantCard key={plant.id} id={plant.id} plant={plant} />
      ))}
    </ul>
  );
};

export default PlantList;
