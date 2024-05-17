import Header from "@/app/components/Header";
import ProductItem from "@/app/components/products-item";
import RestaurantItem from "@/app/components/restaurant-item";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { fetch } from "@/app/page";
import { getServerSession } from "next-auth";


interface CategoriesPageProps {
  params: {
    id: string
  }
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const { allCategories } = await fetch();
  const category = await db.category.findUnique({
    where: {
      id
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  const restaurants = await db.restaurant.findMany({
    where: {
      categories: {
        some: {
          id: id
        }
      }
    }
  })
  const session = await getServerSession(authOptions)
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id }
  })



  return (
    <>

      <Header categories={allCategories} />
      <div className=" px-5 py-6 sm:px-40">
        <h2 className="mb-6 text-lg font-bold">
          {category?.name}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-8 gap-4 ">
          {category?.products.slice(0, 16).map((product) => (
            <ProductItem key={product.id} product={product} className="min-w-full sm:w-auto" />
          ))}
        </div>
        <div className="pt-6 hidden sm:block">
          <h2 className="mb-6 text-lg font-bold">
            Restaurantes
          </h2>
          <div className="flex w-full flex-col sm:grid sm:grid-cols-3 gap-2">
            {restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                userId={session?.user.id}
                userFavoriteRestaurants={userFavoriteRestaurants}
                className="min-w-full max-w-full"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;