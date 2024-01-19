import { FC, Suspense } from "react";
import Image from "next/image";
import Navbar from "./nav/Navbar";
import Link from "next/link";
import Spinner from "./Spinner";

const Header: FC = () => {
  return (
    <header className="flex justify-between p-4 rounded-b-md bg-accent-color bg-opacity-30">
      <Link href="/">
        <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
      </Link>

      <Suspense fallback={<Spinner />}>
        <Navbar />
      </Suspense>
    </header>
  );
};

export default Header;
