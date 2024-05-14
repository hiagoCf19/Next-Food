
import { Suspense } from "react";
import Restaurants from "./components/restaurants";
import { db } from "../lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

const RestaurantsPage = async () => {
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
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
}

export default RestaurantsPage;