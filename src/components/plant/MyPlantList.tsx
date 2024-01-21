"use client";

import { FC, useEffect, useState } from "react";
import { getMyPlants } from "@/utils/api";
import { PlantSummary } from "@/types/plant";
import PlantList from "./PlantList";
import NoResults from "../NoResults";
import Spinner from "../Spinner";
import { useInView } from "react-intersection-observer";
import ScrollToTopButton from "../button/ScrollToTopButton";

const MyPlantList: FC = () => {
  const { ref, inView } = useInView();
  const [myPlants, setMyPlants] = useState<PlantSummary[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyPlants = async () => {
      setLoading(true);
      const plants = await getMyPlants();
      setMyPlants(plants);
      setLoading(false);
    };

    loadMyPlants();
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      loadMorePlants();
    }
  }, [inView]);

  const loadMorePlants = async () => {
    const nextPage = pagesLoaded + 1;
    const newPlants = await getMyPlants(nextPage);

    if (newPlants.length === 0) {
      setHasMore(false);
    }

    setMyPlants((plants) => [...plants, ...newPlants]);
    setPagesLoaded(nextPage);
  };

  const removePlant = (plantId: number) => {
    setMyPlants((myPlants) => myPlants.filter((plant) => plant.id !== plantId));
  };

  if (!loading && myPlants.length === 0) {
    return (
      <NoResults text="You currently don't have any plants in your collection" />
    );
  }

  return (
    <>
      <PlantList
        plants={myPlants}
        onToggle={(plantId: number) => removePlant(plantId)}
      />

      <div ref={ref}>{inView && hasMore && <Spinner />}</div>

      <ScrollToTopButton />
    </>
  );
};

export default MyPlantList;
