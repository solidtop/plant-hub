"use client";

import { FC, useEffect, useRef, useState } from "react";
import UserIcon from "/public/icons/user-solid.svg";
import Image from "next/image";
import Dropdown from "../Dropdown";
import LogoutIcon from "/public/icons/right-from-bracket-solid.svg";
import useUser from "@/hooks/useUser";
import { UserDTO } from "@/types/user";
import CircleButton from "./CircleButton";

type UserButtonProps = {
  user: UserDTO;
};

const UserButton: FC<UserButtonProps> = ({ user }) => {
  const { logout } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (ev: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(ev.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <CircleButton
        onClick={() => setOpen((open) => !open)}
        icon={UserIcon}
        iconWidth={20}
        iconHeight={20}
        alt="User icon"
      />

      {open && (
        <Dropdown>
          <span className="flex flex-col">
            {user.firstName ? user.firstName : user.username}
          </span>

          <button
            onClick={async () => {
              await logout();
              window.location.replace("/");
            }}
            className="relative flex w-full p-2"
          >
            Log out
            <Image
              src={LogoutIcon}
              width={15}
              height={11.5}
              alt="Logout icon"
            />
          </button>
        </Dropdown>
      )}
    </div>
  );
};

export default UserButton;
