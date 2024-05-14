"use server";
import { db } from "../lib/prisma";

export const favoriteRestaurant = async (
  userId: string,
  restaurantId: string
) => {
  return db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });
};
