"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";
import SecondaryLink from "../link/SecondaryLink";
import PrimaryLink from "../link/PrimaryLink";

type NavItemProps = {
  name: string;
  path: string;
  primary?: boolean;
  className?: string;
};

const NavItem: FC<NavItemProps> = ({
  name,
  path,
  primary = true,
  className = "",
}) => {
  const pathname = usePathname();

  return (
    <li className={`list-none ${className}`}>
      {primary ? (
        <PrimaryLink href={path}>{name}</PrimaryLink>
      ) : (
        <SecondaryLink
          href={path}
          className={`${pathname === path ? "bg-slate-700" : ""}`}
        >
          {name}
        </SecondaryLink>
      )}
    </li>
  );
};

export default NavItem;
