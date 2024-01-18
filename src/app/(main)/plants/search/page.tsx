import NoResults from "@/components/NoResults";
import Searchbar from "@/components/input/Searchbar";
import PlantList from "@/components/plant/PlantList";
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

  if (plants.length === 0) {
    return <NoResults text={`No results for "${query}"`} />;
  }

  return (
    <main>
      <Searchbar />

      <section className="p-4">
        <h1>{`Results for "${query}"`}</h1>

        <PlantList plants={plants} />
      </section>
    </main>
  );
}
