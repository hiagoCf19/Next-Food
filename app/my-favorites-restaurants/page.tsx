import { getServerSession } from "next-auth";
import { db } from "../lib/prisma";
import { authOptions } from "../lib/auth";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import RestaurantItem from "../components/restaurant-item";

const MyFavoritesRestaurants = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return notFound()
  }
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      restaurant: true,
    },
  })
  return (
    <>
      <Header />
      <div className=" px-5 py-6">
        <h2 className="mb-6 text-llg font-semibold">
          Restaurantes Favoritos
        </h2>
        <div className="flex w-full flex-col gap-2">
          {userFavoriteRestaurants.map(({ restaurant }) => (
            <RestaurantItem
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

export default MyFavoritesRestaurants;