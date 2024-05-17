import Header from "@/app/components/Header";
import RestaurantItem from "@/app/components/restaurant-item";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { fetch } from "@/app/page";
import { getServerSession } from "next-auth";


const RecommendedRestaurants = async () => {
  const { allCategories } = await fetch();
  const restaurants = await db.restaurant.findMany({

  })
  const session = await getServerSession(authOptions)

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id
    },
    include: {
      restaurant: true,
    },
  })
  return (
    <>
      <Header categories={allCategories} />
      <div className=" px-5 py-6">
        <h2 className="mb-6 text-llg font-semibold">Restaurantes Recomendados</h2>
        <div className="flex w-full flex-col gap-2">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              userId={session?.user.id}
              restaurant={restaurant}
              key={restaurant.id}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default RecommendedRestaurants;