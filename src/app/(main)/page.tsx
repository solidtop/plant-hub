import PlantList from "@/components/plant/PlantList";
import PrimaryLink from "@/components/link/PrimaryLink";
import Searchbar from "@/components/input/Searchbar";
import Image from "next/image";
import { getPlants } from "@/utils/api";
import { cookies } from "next/headers";
import NoResults from "@/components/NoResults";

export default async function Home() {
  const loggedIn = cookies().get("token")?.value;
  const plants = await getPlants();

  if (plants.length === 0) {
    return <NoResults text="Could not find any plants" />;
  }

  return (
    <main>
      <Searchbar />

      {!loggedIn && (
        <div className="relative">
          <Image
            src="/images/hero-placeholder.png"
            width={500}
            height={500}
            alt="Hero image"
            className="w-full max-h-96 object-cover -z-10"
          />

          <section className="absolute inset-4 gap-4">
            <h1>Welcome to Plant Hub!</h1>
            <p className="w-52 mt-4 text-xl">
              Sign up to keep track of your plants
            </p>

            <PrimaryLink href="/signup" className="ml-auto">
              Sign up
            </PrimaryLink>
          </section>
        </div>
      )}

      <section className="p-4">
        <h2>Browse plants</h2>

        <PlantList plants={plants} />
      </section>
    </main>
  );
}
