import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { FC } from "react";

type PrimaryLinkProps = {
  href: Url;
  children?: React.ReactNode;
  className?: string;
};

const PrimaryLink: FC<PrimaryLinkProps> = ({
  href,
  children,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`w-[100px] h-[50px] flex justify-center items-center text-xl rounded-md bg-secondary-color ${className}`}
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
