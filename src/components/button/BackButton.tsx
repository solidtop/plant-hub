"use client";

import { FC } from "react";
import AngleLeftIcon from "/public/icons/angle-left-solid.svg";
import { useRouter } from "next/navigation";
import CircleButton from "./CircleButton";

type BackButtonProps = {
  className?: string;
};

const BackButton: FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();

  return (
    <CircleButton
      icon={AngleLeftIcon}
      onClick={() => router.back()}
      className={className}
    />
  );
};

export default BackButton;
