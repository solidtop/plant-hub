import { FC } from "react";
import PrimaryLink from "./PrimaryLink";
import SecondaryLink from "./SecondaryLink";

const Navbar: FC = () => {
  return (
    <nav className="flex gap-4">
      <SecondaryLink href="/login">Log in</SecondaryLink>
      <PrimaryLink href="/register">Sign up</PrimaryLink>
    </nav>
  );
};

export default Navbar;
