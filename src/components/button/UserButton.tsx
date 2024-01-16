"use client";

import { FC, useEffect, useRef, useState } from "react";
import UserIcon from "/public/icons/user-solid.svg";
import Image from "next/image";
import Dropdown from "../Dropdown";
import LogoutIcon from "/public/icons/right-from-bracket-solid.svg";
import fetchData from "@/utils/fetchData";
import useUser from "@/hooks/useUser";

const UserButton: FC = () => {
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
      <button onClick={() => setOpen((open) => !open)}>
        <div className="w-12 h-12 p-1 bg-accent-color bg-opacity-30 rounded-full">
          <div className="w-full h-full flex justify-center items-center bg-primary-color rounded-full">
            <Image src={UserIcon} width={20} height={20} alt="User icon" />
          </div>
        </div>
      </button>

      {open && (
        <Dropdown>
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
