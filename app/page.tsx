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

const fetch = async () => {
  const getProducts = db.product.findMany({
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
  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    }
  })
  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    }
  })

  const [products, burguersCategory, pizzasCategory] = await Promise.all([getProducts, getBurguersCategory, getPizzasCategory])

  return { products, burguersCategory, pizzasCategory }
}
const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();
  return (
    <>
      <Header />
      <div className="px-5 sm:px-0 pt-6 sm:pt-0">
        <Search />
      </div>
      <div className="pt-6 sm:pt-10">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 sm:pt-10 sm:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/banner-promo-01.png"
            alt="até 30% de desconto em pizzas"
          />
        </Link>
      </div>
      <div className="pt-6 sm:pt-10 space-y-4">
        <div className="px-5 flex justify-between items-center sm:px-20">

          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant={"ghost"}
            className="text-primary p-0 sm:px-20 hover:bg-transparent hover:text-primary hover:underline h-fit "
            asChild
          >
            <Link href={`/products/recommended`} >
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>

        </div>
        <ProductList products={products} />
      </div>
      <div className="pt-6 sm:pt-10 sm:flex sm:px-20">
        <Link
          href={`/categories/${pizzasCategory?.id}/products`} className="hidden sm:block">
          <PromoBanner
            src="/banner-promo-01.png"
            alt="até 30% de desconto em pizzas"
          />
        </Link>
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/banner-promo-02.png"
            alt="A partir de 17,90 em lanches"
          />
        </Link>
      </div>
      <div className="pt-6 sm:pt-10 space-y-4">
        <div className="px-5 flex justify-between items-center sm:px-20">

          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant={"ghost"}
            className="text-primary p-0 sm:px-20 hover:bg-transparent hover:text-primary hover:underline h-fit "
            asChild
          >
            <Link href={`/restaurants/recommended`} >
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>


          </Button>
        </div>
        <RestaurantList />
      </div>
    </>

  );
}
export default Home
