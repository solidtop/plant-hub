"use client";

import InCollectionLabel from "@/components/InCollectionLabel";
import Spinner from "@/components/Spinner";
import PlantToggle from "@/components/plant/PlantToggle";
import { isInCollection } from "@/lib/plants";
import { FC, useEffect, useState } from "react";

type CollectionWrapperProps = {
  plantId: number;
};

const CollectionWrapper: FC<CollectionWrapperProps> = ({ plantId }) => {
  const [inCollection, setInCollection] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkInCollection = async () => {
      setLoading(true);
      const state = await isInCollection(plantId);
      setInCollection(state);
      setLoading(false);
    };

    checkInCollection();
  }, []);

  return (
    <>
      {inCollection && (
        <InCollectionLabel className="absolute right-4 -bottom-3 bg-accent-color/40" />
      )}

      <section className="fixed bottom-0 w-full h-[70px] flex justify-center items-center bg-accent-color/30 rounded-t-md backdrop-blur-lg z-50">
        {loading ? (
          <Spinner />
        ) : (
          <PlantToggle
            plantId={plantId}
            inCollection={inCollection}
            onToggle={(active: boolean) => setInCollection(active)}
          />
        )}
      </section>
    </>
  );
};

export default CollectionWrapper;
