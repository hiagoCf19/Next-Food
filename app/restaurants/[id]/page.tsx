import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/components/delivery-info";
import ProductList from "@/app/components/products-list";
import CartBanner from "./components/cart-banner";

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
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
    <div className="">
      <RestaurantImage restaurant={restaurant} />
      <div
        className="flex justify-between items-center px-5 pt-5 z-50 relative mt-[-1.5rem] p-5 rounded-t-3xl bg-white "
      >
        {/* titulo */}
        <div className="flex items-center gap-[0.375rem]">
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
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      {/* tags */}
      <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden px-5  mt-3">
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
      {/* TODO: mostrar mais pedidos futuramente */}
      <div className="mt-6 space-y-4">
        <h2 className="font-semibold px-5">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="font-semibold px-5">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
      <div className="w-full p-5 h-20" />
      <CartBanner restaurant={restaurant} />
    </div>
  );
}

export default RestaurantPage;