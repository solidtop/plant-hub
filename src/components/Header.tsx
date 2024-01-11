import { FC } from "react";
import Image from "next/image";
import Navbar from "./Navbar";

const Header: FC = () => {
  return (
    <header className="flex justify-between p-4 rounded-b-md bg-accent-color2 bg-opacity-30">
      <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
      <Navbar />
    </header>
  );
};

export default Header;
