import Link from "next/link";
import { FC } from "react";
import AngleLeftIcon from "/public/icons/angle-left-solid.svg";
import Image from "next/image";

type BackLinkProps = {
  className?: string;
};

const BackLink: FC<BackLinkProps> = ({ className }) => {
  return (
    <Link href="/" className={className}>
      <div className="w-12 h-12 p-1 bg-accent-color bg-opacity-30 rounded-full">
        <div className="w-full h-full flex justify-center items-center bg-primary-color rounded-full">
          <Image
            src={AngleLeftIcon}
            width={12}
            height={18}
            alt="Angle left icon"
          />
        </div>
      </div>
    </Link>
  );
};

export default BackLink;
