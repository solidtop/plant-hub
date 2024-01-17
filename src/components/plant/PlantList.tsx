import { FC } from "react";
import PlantCard from "./PlantCard";
import { getPlants } from "@/utils/api";
import NoResults from "../NoResults";
import UserDTO from "@/types/UserDTO";

type PlantListProps = {
  user: UserDTO | null;
  query?: string;
};

const PlantList: FC<PlantListProps> = async ({ user, query = "" }) => {
  const plants = await getPlants(query);

  if (plants.length == 0) {
    return <NoResults />;
  }

  return (
    <ul>
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          id={plant.id}
          plant={plant}
          loggedIn={user ? true : false}
        />
      ))}
    </ul>
  );
};

export default PlantList;
