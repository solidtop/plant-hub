"use client";

import useUser from "@/hooks/useUser";
import { PlantSummary } from "@/types/plant";
import fetchData from "@/utils/fetchData";
import { FC, useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import TogglePlantButton from "../button/TogglePlantButton";

const PlantList: FC = () => {
  const { user } = useUser();
  const [plants, setPlants] = useState<PlantSummary[]>([]);

  useEffect(() => {
    const getPlants = async () => {
      const payload = await fetchData<PlantSummary[]>("/api/plants");
      if (payload) {
        setPlants(payload);
      }
    };

    getPlants();
  }, []);

  const handleClick = () => {
    console.log("click"); // TODO: Send request to /api/my-plants
  };

  return (
    <ul>
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          id={plant.id}
          plant={plant}
          inCollection={user ? true : false}
        >
          {user && <TogglePlantButton active={true} onClick={handleClick} />}
        </PlantCard>
      ))}
    </ul>
  );
};

export default PlantList;
