import Header from "./components/Header";
import CategoryList from "./components/category-list";
import Search from "./components/search";
import ProductList from "./components/products-list";
import { Button } from "./components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./lib/prisma";
import PromoBanner from "./components/promo-banner";
import RestaurantList from "./components/restaurant-list";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        }
      }
    }
  })
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
        <PromoBanner
          src="/banner-promo-01.png"
          alt="até 30% de desconto em pizzas"
        />
      </div>
      <div className="pt-6 space-y-4">
        <div className="px-5 flex justify-between items-center">

          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Link href={`/products/recommended`} >
            <Button variant={"ghost"} className="text-primary p-0 hover:bg-transparent hover:text-primary hover:underline h-fit ">
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <ProductList products={products} />
      </div>
      <div className="pt-6">
        <PromoBanner
          src="/banner-promo-02.png"
          alt="A partir de 17,90 em lanches"
        />
      </div>
      <div className="pt-6 space-y-4">
        <div className="px-5 flex justify-between items-center">

          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Link href={`/restaurants/recommended`} >
            <Button variant={"ghost"} className="text-primary p-0 hover:bg-transparent hover:text-primary hover:underline h-fit ">
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <RestaurantList />
      </div>
    </>

  );
}
export default Home
