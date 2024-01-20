"use client";

import Image from "next/image";
import { FC, FormEvent, useState } from "react";
import SearchIcon from "/public/icons/magnifying-glass-solid.svg";
import { useRouter } from "next/navigation";

const Searchbar: FC = () => {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleSearch = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    router.push(`/plants/search?query=${text}`);
  };

  return (
    <nav className="sticky top-0 left-0 mt-1 p-2 rounded-md bg-accent-color bg-opacity-30 backdrop-blur-xl shadow-lg shadow-black-trans z-50">
      <form onSubmit={handleSearch}>
        <div className="flex items-center">
          <Image
            src={SearchIcon}
            width={20}
            height={20}
            alt="Search icon"
            className="absolute left-10"
          />

          <input
            type="text"
            placeholder="Search for plants..."
            value={text}
            onChange={(ev) => setText(ev.target.value)}
            className="w-full pl-16 p-4 rounded-full bg-primary-color"
          />
        </div>
      </form>
    </nav>
  );
};

export default Searchbar;
