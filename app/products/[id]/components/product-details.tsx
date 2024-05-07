"use client"

import Cart from "@/app/components/cart";
import DeliveryInfo from "@/app/components/delivery-info";
import DiscountBadge from "@/app/components/discountBadge";
import ProductList from "@/app/components/products-list";
import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
import { CartContext } from "@/app/context/cart";
import { calculateProducTotalPrice, formatCurrency } from "@/app/helpers/price";
import { Prisma, } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

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
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addProductToCart, products } = useContext(CartContext)


  const handleIncreaseQuantity = () => setQuantity(current => current + 1)
  const handleDecreaseQuantity = () => setQuantity(current => {
    if (current === 1) return 1
    return current - 1
  })

  const handleAddToCartClick = () => {
    addProductToCart(product, quantity)
    setIsCartOpen(true)
  }


  return (
    <>
      <div className="z-50 relative mt-[-1.5rem] p-5 rounded-t-3xl bg-white">
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
        <DeliveryInfo restaurant={product.restaurant} />
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
        <div className="mt-5">
          <Button className="w-full font-semibold" onClick={handleAddToCartClick}>
            Adicionar a sacola
          </Button>
        </div>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen} >
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left pt-5">
              Sacola
            </SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ProductDetails;