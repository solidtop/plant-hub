import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { FC } from "react";

type SecondaryLinkProps = {
  href: Url;
  children?: React.ReactNode;
  className?: string;
};

const SecondaryLink: FC<SecondaryLinkProps> = ({
  href,
  children,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`min-w-[100px] min-h-[50px] flex justify-center items-center px-3 text-xl bg-primary-color bg-opacity-40 rounded-md border-2 border-primary-color ${className}`}
    >
      {children}
    </Link>
  );
};

export default SecondaryLink;
