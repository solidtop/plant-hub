import PrimaryLink from "@/components/link/PrimaryLink";
import Searchbar from "@/components/input/Searchbar";
import Image from "next/image";
import { getIndoorPlants } from "@/lib/plants";
import { cookies } from "next/headers";
import NoResults from "@/components/NoResults";
import InfiniteScrollPlants from "@/components/InfiniteScrollPlants";

export default async function Home() {
  const loggedIn = cookies().get("token")?.value ? true : false;
  const plants = await getIndoorPlants();

  return (
    <main>
      <Searchbar />

      {!loggedIn && (
        <div className="relative">
          <Image
            src="/images/hero-placeholder.png"
            width={300}
            height={300}
            alt="Hero image"
            className="w-full max-h-96 object-cover"
          />

          <section className="absolute inset-0 h-fit p-4 bg-gradient-to-b from-primary-color to-transparent backdrop-blur-md">
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
