import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { FC } from "react";

type SecondaryLinkProps = {
  href: Url;
  children?: React.ReactNode;
};

const SecondaryLink: FC<SecondaryLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="flex justify-center items-center w-28 rounded-md text-accent-color1 border-2 border-primary-color"
    >
      {children}
    </Link>
  );
};

export default SecondaryLink;
