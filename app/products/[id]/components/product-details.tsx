"use client"

import Cart from "@/app/components/cart";
import DeliveryInfo from "@/app/components/delivery-info";
import DiscountBadge from "@/app/components/discountBadge";
import ProductList from "@/app/components/products-list";
import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
import { CartContext } from "@/app/context/cart";
import { calculateProducTotalPrice, formatCurrency } from "@/app/helpers/price";
import { Category, Prisma, } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog"
import Link from "next/link";
import ProductImage from "./product-image";
import Header from "@/app/components/Header";


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
  allCategories: Category[]
}
const ProductDetails = ({ product, complementaryProducts, allCategories }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

  const { addProductToCart, products } = useContext(CartContext)

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({
      product: { ...product, quantity }, emptyCart
    })
    setIsCartOpen(true)
  }

  const handleIncreaseQuantity = () => setQuantity(current => current + 1)
  const handleDecreaseQuantity = () => setQuantity(current => {
    if (current === 1) return 1
    return current - 1
  })

  const handleAddToCartClick = () => {

    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId
    )
    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true)
    }
    addToCart({
      emptyCart: false
    })

  }



  return (
    <div className="sm:px-40">
      <div className="mb-5 hidden sm:block">
        <Header categories={allCategories} />
      </div>
      <div className="sm:flex sm:gap-5">
        <ProductImage product={product} />
        {/* TITULO E PREÇO */}
        <div className="flex flex-col overflow-hidden sm:max-w-[45%] pt-5 z-50 relative mt-[-1.5rem] p-5 rounded-t-xl bg-white ">
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
            <Link href={`/restaurants/${product.restaurantId}`} className="text-sm sm:text-md text-muted-foreground font-medium sm:hover:underline sm:hover:text-primary sm:cursor-pointer">
              {product?.restaurant?.name}
            </Link>
          </div>
          {/* NOME DO PRODUTO */}
          <h1 className="font-semibold text-xl sm:text-2xl sm:mt-2">{product.name}</h1>
          {/* PREÇO E QUANTIDADE */}
          <div className="flex  justify-between sm:py-4">
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
          <div className="mt-5 hidden sm:block">
            <div className="flex w-full justify-center">
              <Button className="w-[80%] font-semibold" onClick={handleAddToCartClick}>
                Adicionar a sacola
              </Button>

            </div>
          </div>
          {/* SUCOS */}

        </div>
      </div>


      <div className="mt-6 space-y-3 -mx-5 sm:flex sm:flex-col sm:-mx-0  p-5 sm:p-0">
        <h3 className="font-semibold mx-5 sm:mx-0">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
      <div className="mt-5 sm:hidden">
        <Button className="w-full font-semibold" onClick={handleAddToCartClick}>
          Adicionar a sacola
        </Button>
      </div>
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

      <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Itens de outro Restaurante!</AlertDialogTitle>
            <AlertDialogDescription>
              Você só pode adicionar itens de um restaurtante por vez. Confirmar essa ação irá remover os itens do restaurante anterior. Deseja prosseguir?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

export default ProductDetails;