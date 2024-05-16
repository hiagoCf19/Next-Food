import { getServerSession } from "next-auth";
import { db } from "../lib/prisma";
import { authOptions } from "../lib/auth";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import RestaurantItem from "../components/restaurant-item";
import { fetch } from "../page";

const MyFavoritesRestaurants = async () => {

  const { allCategories } = await fetch();
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
      <Header categories={allCategories} />
      <div className=" px-5 py-6 sm:px-20">
        <h2 className="mb-6 text-llg font-semibold sm:text-xl sm:font-semibold">
          Restaurantes Favoritos
        </h2>
        <div className="flex w-full flex-col sm:grid sm:grid-cols-3 gap-2">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                userId={session.user.id}
                restaurant={restaurant}
                key={restaurant.id}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))

          ) : <div className="flex justify-center items-center border">
            <h1 className="text-muted-foreground font-medium text-sm">Você não possui restaurantes favoritos</h1>
          </div>}
        </div>
      </div>
    </>
  );
}

export default MyFavoritesRestaurants;