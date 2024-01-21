"use client";

import { PlantSummary } from "@/types/plant";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "./Spinner";
import { getPlants } from "@/utils/api";
import PlantList from "./plant/PlantList";
import ScrollToTopButton from "./button/ScrollToTopButton";

type InfiniteScrollPlantsProps = {
  initialPlants: PlantSummary[];
  query?: string;
};

const InfiniteScrollPlants: FC<InfiniteScrollPlantsProps> = ({
  initialPlants,
  query = "",
}) => {
  const { ref, inView } = useInView();
  const [plants, setPlants] = useState(initialPlants);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPlants(initialPlants);
  }, [initialPlants]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMorePlants();
    }
  }, [inView]);

  const loadMorePlants = async () => {
    const nextPage = pagesLoaded + 1;
    const newPlants = await getPlants(query, nextPage);
    if (newPlants.length === 0) {
      setHasMore(false);
    }

    setPlants((plants) => [...plants, ...newPlants]);
    setPagesLoaded(nextPage);
  };

  return (
    <>
      <PlantList plants={plants} />
      {hasMore && <div ref={ref}>{inView && <Spinner />}</div>}

      <ScrollToTopButton />
    </>
  );
};

export default InfiniteScrollPlants;
