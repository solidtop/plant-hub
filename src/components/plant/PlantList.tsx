"use client";

import { FC, useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import { getMyPlantIds } from "@/utils/api";
import { PlantSummary } from "@/types/plant";
import useUser from "@/hooks/useUser";
import Spinner from "../Spinner";

type PlantListProps = {
  plants: PlantSummary[];
  onToggle?: (plantId: number) => void;
};

const PlantList: FC<PlantListProps> = ({ plants, onToggle }) => {
  const { user } = useUser();
  const [myPlantIds, setMyPlantIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlantIds = async () => {
      setLoading(true);
      const ids = await getMyPlantIds();
      setMyPlantIds(ids);
      setLoading(false);
    };

    loadPlantIds();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <ul>
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          id={plant.id}
          plant={plant}
          state={{
            loggedIn: user ? true : false,
            inCollection: myPlantIds.includes(plant.id),
          }}
          onToggle={onToggle ? () => onToggle(plant.id) : undefined}
        />
      ))}
    </ul>
  );
};

export default PlantList;
