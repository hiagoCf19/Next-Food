import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from 'lucide-react';
import Link from "next/link";


const Header = () => {
  return (
    <div className="flex justify-between pt-6 px-5 ">
      <div className="relative h-9 w-20">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="ifood"
            fill
            className="object-contain"
          />
        </Link>

      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent">
        <MenuIcon />
      </Button>
    </div>
  );
}

export default Header;