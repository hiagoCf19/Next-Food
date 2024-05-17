import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/components/delivery-info";
import ProductList from "@/app/components/products-list";
import CartBanner from "./components/cart-banner";
import Header from "@/app/components/Header";
import { fetch } from "@/app/page";

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const { allCategories } = await fetch();
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                }
              }
            }
          }
        }
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            }
          }
        }
      }
    }
  })
  if (!restaurant) {
    return notFound()
  }

  return (
    <>
      <div className="mb-5 hidden sm:block">
        <Header categories={allCategories} />
      </div>
      <div className="sm:flex sm:px-24">

        <RestaurantImage restaurant={restaurant} />
        <div className="flex flex-col overflow-hidden sm:max-w-[35%] pt-5 z-50 relative mt-[-1.5rem] p-5 rounded-t-xl bg-white ">
          <div
            className="flex justify-between items-center "
          >
            {/* titulo */}
            <div className="flex items-center gap-[0.375rem] sm:justify-between">
              <div className="relative h-8 w-8">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h1 className="text-xl font-semibold">{restaurant.name}</h1>

            </div>
            <div className=" gap-[3px]  bg-foreground text-zinc-50 px-2 py-1 rounded-full flex items-center ">
              <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
              <span className="font-semibold text-xs">5.0</span>
            </div>

          </div>
          {/* TEMPO E CUSTO DE ENTREGA */}
          <DeliveryInfo restaurant={restaurant} />
          {/* tags */}
          <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden sm:h-min  mt-3">
            {restaurant.categories.map((category) => (
              <div key={category.id}
                className="bg-[#f4f4f4] min-w-[127px] p-1 rounded-sm text-center"
              >
                <span className="text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="py-5">
            <h1 className="text-lg font-medium">Sobre {restaurant.name}</h1>
            <span className="text-sm text-muted-foreground text-justify ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab autem maxime nemo deleniti laborum dolorum rem saepe doloribus dolor aliquam earum, ex, cum quia obcaecati omnis. Quisquam nam pariatur repudiandae?
            </span>
          </div>
        </div>
      </div>
      {/* TODO: mostrar mais pedidos futuramente */}
      <div className="mt-6 space-y-4 sm:px-20">
        <h2 className="font-semibold px-5">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4 sm:px-20" key={category.id}>
          <h2 className="font-semibold px-5">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
      <div className="w-full p-5 h-20" />
      <CartBanner restaurant={restaurant} />
    </>
  );
}

export default RestaurantPage;