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
      className={`flex justify-center items-center w-28 h-14 rounded-md bg-primary-color ${className}`}
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
