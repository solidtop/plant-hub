"use client";

import TogglePlantButton from "@/components/button/TogglePlantButton";
import { FC, useState } from "react";

const BottomPanel: FC = () => {
  const [inCollection, setInColletion] = useState(false);

  const handleClick = () => {}; // TODO: Send request to /api/my-plants

  return (
    <section className="fixed bottom-0 w-full flex justify-center items-center py-2 bg-accent-color rounded-t-md">
      <TogglePlantButton active={inCollection} onClick={handleClick} />
    </section>
  );
};

export default BottomPanel;
