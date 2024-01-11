import { FC } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="flex justify-between p-4 rounded-b-md bg-accent-color bg-opacity-30">
      <Link href="/">
        <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
