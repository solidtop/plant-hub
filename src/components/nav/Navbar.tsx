import { FC } from "react";
import UserButton from "../button/UserButton";
import { getUserDTO } from "@/lib/users";
import { cookies } from "next/headers";
import NavItem from "./NavItem";

const Navbar: FC = async () => {
  const jwt = cookies().get("token")?.value;
  const user = await getUserDTO(jwt);

  return (
    <nav className="flex gap-4 items-center">
      {user ? (
        <>
          <NavItem
            name="My plants"
            path="/my-plants"
            primary={false}
            className="mx-10"
          />

          <UserButton user={user} />
        </>
      ) : (
        <>
          <NavItem name="Log in" path="/login" primary={false} />
          <NavItem name="Sign up" path="/signup" />
        </>
      )}
    </nav>
  );
};

export default Navbar;
