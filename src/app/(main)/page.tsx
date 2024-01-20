import PrimaryLink from "@/components/link/PrimaryLink";
import Searchbar from "@/components/input/Searchbar";
import Image from "next/image";
import { getIndoorPlants } from "@/utils/api";
import { cookies } from "next/headers";
import NoResults from "@/components/NoResults";
import InfiniteScrollPlants from "@/components/InfiniteScrollPlants";

export default async function Home() {
  const loggedIn = cookies().get("token")?.value;
  const plants = await getIndoorPlants();

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

        {plants.length === 0 ? (
          <NoResults text="Could not find any plants" />
        ) : (
          <InfiniteScrollPlants initialPlants={plants} />
        )}
      </section>
    </main>
  );
}
