import Searchbar from "@/components/input/Searchbar";
import PlantList from "@/components/plant/PlantList";
import UserConverter from "@/utils/UserConverter";
import { getUser } from "@/utils/api";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search | Plant Hub",
};

type SearchProps = {
  searchParams: {
    query?: string;
  };
};

export default async function Search({ searchParams }: SearchProps) {
  const jwt = cookies().get("token")?.value;
  const user = await getUser(jwt);
  const userDTO = user ? UserConverter.convertToDTO(user) : null;

  const query = searchParams.query || "";

  return (
    <main>
      <Searchbar />

      <section className="p-4">
        <h1>{`Results for "${query}"`}</h1>

        <Suspense key={query} fallback={<p>Loading plants...</p>}>
          <PlantList user={userDTO} query={query} />
        </Suspense>
      </section>
    </main>
  );
}
