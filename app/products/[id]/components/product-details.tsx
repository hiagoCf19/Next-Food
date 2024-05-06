"use client"

import DiscountBadge from "@/app/components/discountBadge";
import ProductList from "@/app/components/products-list";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { calculateProducTotalPrice, formatCurrency } from "@/app/helpers/price";
import { Prisma, Product } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true,
    }
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true,
    }
  }>[];
}
const ProductDetails = ({ product, complementaryProducts }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantity = () => setQuantity(current => current + 1)
  const handleDecreaseQuantity = () => setQuantity(current => {
    if (current === 1) return 1
    return current - 1
  })

  return (
    <div className="p-5">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-8 w-8">

          <Image
            src={product?.restaurant?.imageUrl}
            alt={product?.restaurant?.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product?.restaurant?.name}
        </span>
      </div>
      {/* NOME DO PRODUTO */}
      <h1 className="font-semibold text-xl">{product.name}</h1>
      {/* PREÇO E QUANTIDADE */}
      <div className="flex  justify-between">
        {/* PREÇO  com desconto */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProducTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          {/* PREÇO ORIGINAL */}
          <p className="text-muted-foreground text-xs ">De: {formatCurrency(Number(product.price))}
          </p>
        </div>
        {/* QUANTIDADE */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="border border-muted-foreground hover:bg-zinc-50"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-5 text-center"> {quantity}</span>
          <Button
            size="icon"
            onClick={handleIncreaseQuantity}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      {/* DADOS DA ENTREGA */}
      <Card className="flex justify-around py-2 mt-6 rounded-sm  shadow-none">
        <div className="flex flex-col items-center">
          {/* custo */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <BikeIcon size={14} />
            <span className="text-xs">Entrega</span>
          </div>
          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : <p className="text-xs font-semibold"> Grátis</p>
          }
        </div>
        {/* tempo */}
        <div className="flex flex-col items-center">
          {/* custo */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <TimerIcon size={14} />
            <span className="text-xs">Entrega</span>
          </div>
          <p className="text-xs font-semibold">
            {product.restaurant.deliveryTimeMinutes} min
          </p>

        </div>


      </Card>
      {/* SOBRE */}
      <div className="mt-6 space-y-3 ">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground text-justify">{product.description}</p>
      </div>
      {/* SUCOS */}
      <div className="mt-6 space-y-3 -mx-5 ">
        <h3 className="font-semibold mx-5">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>

    </div>
  );
}

export default ProductDetails;