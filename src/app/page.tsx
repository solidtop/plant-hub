import PrimaryLink from "@/components/PrimaryLink";
import Searchbar from "@/components/input/Searchbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Searchbar />

      <Image
        src="/images/hero-placeholder.png"
        width={500}
        height={500}
        alt="Hero image"
        className="absolute w-full max-h-96 object-cover -z-10"
      />
      <section className="p-4 gap-4">
        <h1>Welcome to Plant Hub!</h1>
        <p className="w-52 mt-4 text-xl">
          Sign up to keep track of your plants
        </p>

        <PrimaryLink href="/register" className="ml-auto">
          Sign up
        </PrimaryLink>
      </section>
    </main>
  );
}
