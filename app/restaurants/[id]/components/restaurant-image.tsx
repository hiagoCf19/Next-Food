"use client";
import { Button } from "@/app/components/ui/button";
import { Restaurant } from "@prisma/client";

import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
;

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <div className="relative w-full sm:w-[60%] h-[250px] sm:h-[380px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover sm:rounded-xl "

      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-zinc-50 text-foreground hover:text-zinc-50 shadow-md sm:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>


    </div>
  );
}

export default RestaurantImage;