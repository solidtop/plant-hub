import Image, { StaticImageData } from "next/image";
import { FC, Fragment } from "react";

type PlantStatProps = {
  icon: StaticImageData;
  labels?: string[];
  label?: string;
  size?: number;
};

const PlantStat: FC<PlantStatProps> = ({ icon, labels, label, size = 25 }) => {
  return (
    <li className="flex items-center">
      <div className="p-2 bg-primary-color rounded-md">
        <Image src={icon} width={size} height={size} alt="Stat icon" />
      </div>

      <div className="flex px-2">
        {labels &&
          labels.map((label, index) => (
            <p>
              {index > 0 && ", "}
              {label}
            </p>
          ))}

        {label && <p>{label}</p>}
      </div>
    </li>
  );
};

export default PlantStat;
