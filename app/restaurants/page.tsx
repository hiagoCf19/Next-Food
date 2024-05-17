
import { Suspense } from "react";
import Restaurants from "./components/restaurants";
import { db } from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { fetch } from "../page";

const RestaurantsPage = async () => {
  const { allCategories } = await fetch();
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
    <Suspense>
      <Restaurants
        userId={session?.user.id}
        userFavoriteRestaurants={userFavoriteRestaurants}
        allCategories={allCategories}
      />
    </Suspense>
  );
}

export default RestaurantsPage;