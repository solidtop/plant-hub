import { FC } from "react";
import PrimaryLink from "./link/PrimaryLink";
import SecondaryLink from "./link/SecondaryLink";
import { getUser } from "@/utils/api";
import { cookies } from "next/headers";
import UserButton from "./button/UserButton";
import UserConverter from "@/utils/UserConverter";

const Navbar: FC = async () => {
  const jwt = cookies().get("token")?.value;
  const user = await getUser(jwt);
  const userDTO = user ? UserConverter.convertToDTO(user) : null;

  return (
    <nav className="flex gap-4">
      {userDTO ? (
        <>
          <SecondaryLink href="/my-plants" className="mr-10">
            My plants
          </SecondaryLink>
          <UserButton user={userDTO} />
        </>
      ) : (
        <>
          <SecondaryLink href="/login">Log in</SecondaryLink>
          <PrimaryLink href="/signup">Sign up</PrimaryLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
