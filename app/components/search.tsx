"use client"

import Image from "next/image";
import SearchForm from "./inputSearch";


const Search = () => {


  return (
    <div className="flex sm:bg-primary sm:px-20 sm:h-96 ">
      <div className="flex w-full sm:w-[70%] sm:flex-col sm:justify-center">
        <div className="hidden sm:flex sm:flex-col text-white gap-1 sm:py-6">
          <h1 className="font-bold text-5xl">Está com fome?</h1>
          <span className="text-md">Com apenas alguns cliques encontre refeições acessíveis perto de você.</span>
        </div>
        <SearchForm />

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