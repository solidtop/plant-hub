import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FC } from "react";

type CircleButtonProps = {
  icon: StaticImport;
  alt: string;
  iconWidth?: number;
  iconHeight?: number;
  onClick?: () => void;
  className?: string;
};

const CircleButton: FC<CircleButtonProps> = ({
  icon,
  alt,
  iconWidth = 0,
  iconHeight = 0,
  onClick,
  className = "",
}) => {
  return (
    <button onClick={onClick} className={className}>
      <div className="w-[50px] h-[50px] p-[5px] bg-accent-color bg-opacity-30 rounded-full backdrop-blur-md">
        <div className="w-full h-full flex justify-center items-center bg-primary-color rounded-full">
          <Image src={icon} width={iconWidth} height={iconHeight} alt={alt} />
        </div>
      </div>
    </button>
  );
};

export default CircleButton;
