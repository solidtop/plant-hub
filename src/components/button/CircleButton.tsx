import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FC } from "react";

type CircleButtonProps = {
  icon: StaticImport;
  onClick: () => void;
  className?: string;
};

const CircleButton: FC<CircleButtonProps> = ({
  icon,
  onClick,
  className = "",
}) => {
  return (
    <button onClick={onClick} className={className}>
      <div className="w-12 h-12 p-1 bg-accent-color bg-opacity-30 rounded-full">
        <div className="w-full h-full flex justify-center items-center bg-primary-color rounded-full">
          <Image src={icon} width={12} height={18} alt="Button icon" />
        </div>
      </div>
    </button>
  );
};

export default CircleButton;
