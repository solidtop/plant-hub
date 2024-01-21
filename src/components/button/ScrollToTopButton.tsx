"use client";

import { FC, useEffect, useState } from "react";
import AngleUpIcon from "/public/icons/angle-up-solid.svg";
import CircleButton from "./CircleButton";

const ScrollToTopButton: FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showScrollToTop) {
    return null;
  }

  return (
    <div className="fixed left-0 bottom-0 w-full flex justify-center p-4 z-10">
      <CircleButton
        icon={AngleUpIcon}
        alt="Angle up icon"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
};

export default ScrollToTopButton;
