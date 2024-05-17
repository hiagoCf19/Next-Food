/* eslint-disable react/no-unescaped-entities */
"use client"
import Header from "@/app/components/Header";
import RestaurantItem from "@/app/components/restaurant-item";
import { Category, Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";


interface RestauranteProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[]
  userId?: string
  allCategories: Category[]
}
const Restaurants = ({ userFavoriteRestaurants, userId, allCategories }: RestauranteProps) => {

  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }
  console.log(searchFor)
  return (
    <>
      <Header categories={allCategories} />
      <div className=" px-5 py-6 sm:px-20">
        <h2 className="mb-6 text-llg font-semibold">Resultados para "{searchFor}"</h2>
        <div className="flex w-full flex-col gap-2 sm:grid sm:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              userId={userId}
              userFavoriteRestaurants={userFavoriteRestaurants}
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

export default Restaurants;