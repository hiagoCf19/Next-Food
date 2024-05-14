"use client"
import { Restaurant } from "@prisma/client";
import { BikeIcon, ClockIcon, HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "./ui/button";
import { formatCurrency } from "../helpers/price";
import Link from "next/link";
import { cn } from "../lib/utils";
import { favoriteRestaurant } from "../_actions/restaurant";
import { toast } from "sonner";

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant
  className?: string
}
const RestaurantItem = ({ restaurant, className, userId }: RestaurantItemProps) => {

  const handleFavoriteClick = async () => {
    if (!userId) return
    try {
      await favoriteRestaurant(userId, restaurant.id)
      toast.success("Restaurante favoritado com sucesso!")
    } catch (error) {
      toast.error("Você já favoritou este restaurante")
    }
  }
  return (
    <div
      className={cn("min-w-[266px] max-w-[266px] pb-5", className)}
    >
      <div className="w-full">
        {/* imagem */}
        <div className="w-full h-[136px] relative">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              className="object-cover rounded-lg "
              alt={restaurant.name}
            />
          </Link>
          <div className="absolute gap-[2px] top-2 left-2 bg-zinc-50 px-2 py-[2px] rounded-full flex items-center ">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="font-semibold text-xs">5.0</span>
          </div>
          {userId && (
            <Button
              size={"icon"}
              className="absolute top-2 right-2 bg-[#5b5959ca] w-7 h-7 rounded-full"
              onClick={handleFavoriteClick}
            >
              <HeartIcon className="fill-white text-white" size={12} />
            </Button>
          )}
        </div>
        {/* text */}
        <div className="">
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          {/* INFORMAÇÕES DA ENTREGA */}
          <div className="flex gap-3">
            {/* CUSTO DE ENTREGA  */}
            <div className="flex gap-1 items-center">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega gratis"
                  : formatCurrency(Number(restaurant.deliveryFee))
                }
              </span>

            </div>
            {/* Tempo de entrega */}
            <div className="flex gap-1 items-center">
              <ClockIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default RestaurantItem;