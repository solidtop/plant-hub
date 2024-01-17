import Searchbar from "@/components/input/Searchbar";
import PlantList from "@/components/plant/PlantList";
import { Metadata } from "next";
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
  const query = searchParams.query || "";

  return (
    <main>
      <Searchbar />

      <section className="p-4">
        <h1>{`Results for "${query}"`}</h1>

        <Suspense key={query} fallback={<p>Loading plants...</p>}>
          <PlantList query={query} />
        </Suspense>
      </section>
    </main>
  );
}
