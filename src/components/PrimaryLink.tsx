import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { FC } from "react";

type PrimaryLinkProps = {
  href: Url;
  children?: React.ReactNode;
};

const PrimaryLink: FC<PrimaryLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="flex justify-center items-center w-28 rounded-md text-white bg-primary-color"
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
