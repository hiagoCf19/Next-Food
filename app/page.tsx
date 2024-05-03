
import Image from "next/image";
import Header from "./components/Header";
import CategoryList from "./components/category-list";
import Search from "./components/search";
import ProductList from "./components/products-list";
import { Button } from "./components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src={"/banner-promo-01.png"}
          alt="até 30% de desconto em pizzas"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>
      <div className="pt-6 space-y-4">
        <div className="px-5 flex justify-between items-center">

          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant={"ghost"} className="text-primary p-0 hover:bg-transparent hover:text-primary hover:underline h-fit ">
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList />
      </div>

    </>

  );
}
