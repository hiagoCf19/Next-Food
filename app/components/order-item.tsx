"use client"
import { OrderStatus, Prisma } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatCurrency } from "../helpers/price";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/cart";
import { useRouter } from "next/navigation";


interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true,
      products: {
        include: {
          product: true
        }
      },
    }
  }>
}
const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED": return "Cancelado";
    case "COMPLETED": return "Finalizado";
    case "CONFIRMED": return "Confirmado";
    case "DELIVERING": return "Em transporte";
    case "PREPARING": return "Preparando";

  }
}
const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCart } = useContext(CartContext)
  const router = useRouter()

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: {
          ...orderProduct.product,
          restaurant: order.restaurant,
          quantity: orderProduct.quantity
        },
      })
    }
    router.push(`/restaurants/${order.restaurantId}`)
  }
  return (
    <Card className="">
      <CardContent className="px-5 py-2">
        <div className=" justify-end flex">
          <div className={`text-white  rounded-sm w-fit py-1 px-2 items-center flex
           ${order.status === "COMPLETED"
              ? 'bg-muted-foreground  '
              : order.status === "CANCELED"
                ? 'bg-red-500'
                : order.status === "CONFIRMED"
                  ? 'bg-green-500 text-white'
                  : order.status === "PREPARING"
                    ? 'bg-yellow-500'
                    : 'bg-green-600'
            }
           `}
          >
            <span className="block text-xs font-semibold"> {getOrderStatusLabel(order.status)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>


          <Button
            size="icon"
            variant={"link"}
            className="size-7 text-black"
            asChild
          >
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>

          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map(orderProduct => (
            <div
              key={orderProduct.id}
              className="flex gap-2 items-center "
            >
              <div className="size-5 rounded-full bg-muted-foreground flex items-center justify-center">
                <span className="block text-xs text-white">{orderProduct.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {orderProduct.product.name}
              </span>
            </div>
          ))}
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm ">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant={"ghost"}
            className="text-primary hover:bg-transparent"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrderClick}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItem;