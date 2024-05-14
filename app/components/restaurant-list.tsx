import { getServerSession } from "next-auth";
import { db } from "../lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../lib/auth";

const RestaurantList = async () => {
  7
  const session = await getServerSession(authOptions)
  const restaurants = await db.restaurant.findMany({ take: 10 })

  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5 ">
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} userId={session?.user.id} />
      ))}
    </div>
  );
}

export default RestaurantList;