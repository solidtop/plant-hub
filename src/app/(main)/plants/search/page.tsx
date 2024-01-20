import InfiniteScrollPlants from "@/components/InfiniteScrollPlants";
import NoResults from "@/components/NoResults";
import Searchbar from "@/components/input/Searchbar";
import { getPlants } from "@/utils/api";
import { Metadata } from "next";

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
  const plants = await getPlants(query);

  return (
    <main>
      <Searchbar />

      <section className="p-4">
        <h1>{`Results for "${query}"`}</h1>

        {plants.length == 0 ? (
          <NoResults text="No results" />
        ) : (
          <InfiniteScrollPlants initialPlants={plants} query={query} />
        )}
      </section>
    </main>
  );
}
