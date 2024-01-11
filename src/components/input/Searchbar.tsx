"use client";

import Image from "next/image";
import { FC, FormEvent, useState } from "react";
import SearchIcon from "/public/icons/magnifying-glass-solid.svg";
import { useRouter } from "next/navigation";

type SearchbarProps = {};

const Searchbar: FC<SearchbarProps> = () => {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    router.push(`/search?query=${text}`);
  };

  return (
    <nav className="sticky p-4 rounded-md bg-accent-color2 bg-opacity-30">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <Image
            src={SearchIcon}
            alt="Search icon"
            className="absolute left-10"
          />

          <input
            type="text"
            placeholder="Search for plants..."
            value={text}
            onChange={(ev) => setText(ev.target.value)}
            className="w-full pl-16 p-4 rounded-full text-white bg-primary-color"
          />
        </div>
      </form>
    </nav>
  );
};

export default Searchbar;
