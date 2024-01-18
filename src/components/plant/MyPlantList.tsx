"use client";

import { FC, useEffect, useState } from "react";
import { getMyPlants } from "@/utils/api";
import { PlantSummary } from "@/types/plant";
import PlantList from "./PlantList";
import NoResults from "../NoResults";
import Spinner from "../Spinner";

const MyPlantList: FC = () => {
  const [myPlants, setMyPlants] = useState<PlantSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMyPlants = async () => {
      setLoading(true);
      const plants = await getMyPlants();
      setMyPlants(plants);
      setLoading(false);
    };

    loadMyPlants();
  }, []);

  const removePlant = (plantId: number) => {
    setMyPlants((myPlants) => myPlants.filter((plant) => plant.id !== plantId));
  };

  if (loading) {
    return <Spinner />;
  }

  if (myPlants.length === 0) {
    return (
      <NoResults text="You currently don't have any plants in your collection" />
    );
  }

  return (
    <PlantList
      plants={myPlants}
      onToggle={(plantId: number) => removePlant(plantId)}
    />
  );
};

export default MyPlantList;
