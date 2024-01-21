"use client";

import Image from "next/image";
import { FC } from "react";
import SearchIcon from "/public/icons/magnifying-glass-solid.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Searchbar: FC = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
      replace(`/plants/search?${params.toString()}`);
    }
  }, 300);

  return (
    <nav className="sticky top-0 left-0 mt-1 p-2 rounded-md bg-accent-color bg-opacity-30 backdrop-blur-xl shadow-lg shadow-black-trans z-10 border-t-[1px] border-white/20">
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
          onChange={(ev) => handleSearch(ev.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          className="w-full pl-16 p-4 rounded-full bg-primary-color"
        />
      </div>
    </nav>
  );
};

export default Searchbar;
