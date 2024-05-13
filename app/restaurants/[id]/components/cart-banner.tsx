"use client"

import Cart from "@/app/components/cart";
import { Button } from "@/app/components/ui/button";
import { CartContext } from "@/app/context/cart";
import { formatCurrency } from "@/app/helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
interface CartBannerProps {
  restaurant: Pick<Restaurant, 'id'>
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const restaurantProductsInCart = products.some((product) => {
    return product.restaurantId === restaurant.id
  })
  if (!restaurantProductsInCart) return null
  return (
    <div className="fixed bottom-0 left-0 z-50 p-5 py-2 bg-white w-full border">
      <div className="flex justify-between items-center">
        {/* PREÇO */}
        <div >
          <span className="text-xs font-medium text-muted-foreground">
            Total com entrega: </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}
            <span className="text-xs text-muted-foreground font-normal ">
              {" "}
              / {totalQuantity} {totalQuantity > 1 ? 'Itens' : 'Item'}</span>
          </h3>
        </div>
        {/* BOTÃO */}
        <Button onClick={() => setIsCartOpen(true)}> Ver sacola</Button>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen} >
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left pt-5">
                Sacola
              </SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>

      </div>
    </div>
  );
}

export default CartBanner;