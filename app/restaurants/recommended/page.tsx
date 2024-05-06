import Header from "@/app/components/Header";
import RestaurantItem from "@/app/components/restaurant-item";
import { db } from "@/app/lib/prisma";

const RecommendedRestaurants = async () => {

  const restaurants = await db.restaurant.findMany({

  })
  return (
    <>
      <Header />
      <div className=" px-5 py-6">
        <h2 className="mb-6 text-llg font-semibold">Restaurantes Recomendados</h2>
        <div className="flex w-full flex-col gap-2">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant}
              key={restaurant.id}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default RecommendedRestaurants;