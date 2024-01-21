import { FC } from "react";
import Image from "next/image";
import Navbar from "./nav/Navbar";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="flex justify-between p-3 rounded-b-md bg-accent-color bg-opacity-30 backdrop-blur-xl">
      <Link href="/">
        <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
      </Link>

      <Navbar />
    </header>
  );
};

export default Header;
