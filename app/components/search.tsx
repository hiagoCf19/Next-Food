"use client"
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


const Search = () => {
  const router = useRouter();
  const [search, setSeach] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeach(e.target.value);
  };
  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return
    }
    router.push(`/restaurants?search=${search}`)
  };

  return (
    <div className="flex sm:bg-primary sm:px-20 sm:h-96 ">
      <div className="flex w-full sm:w-[70%] sm:flex-col sm:justify-center">
        <div className="hidden sm:flex sm:flex-col text-white gap-1 sm:py-6">
          <h1 className="font-bold text-5xl">Está com fome?</h1>
          <span className="text-md">Com apenas alguns cliques encontre refeições acessíveis perto de você.</span>
        </div>
        <form className="flex gap-2 w-full sm:bg-white sm:w-[40%] items-center sm:gap-0 sm:p-3 sm:rounded-lg "
          onSubmit={handleSearchSubmit}>

          <Input
            placeholder="Buscar restaurantes"
            className=" border-none sm:bg-white outline-none focus-visible:ring-transparent  "
            onChange={handleChange}
            value={search}

          />
          <Button size="icon" type="submit" className="sm:bg-[#FFB100]"  >
            <SearchIcon size={20} />
          </Button>
        </form>

      </div>
      <div className="hidden items-end sm:flex sm:marker:justify-center">
        <Image
          src="/ImageBase.png"
          alt="Yakisoba banner"
          width={300}
          height={300}

        />

      </div>


    </div>
  );
}

export default Search;