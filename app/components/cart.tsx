import { useContext } from "react";
import { CartContext } from "../context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products,
    subTotalPrice,
    totalPrice,
    totalDiscount,
  } = useContext(CartContext)

  const finalPrice = products.length > 0 ? totalPrice + Number(products[0].restaurant.deliveryFee) : 0

  return (

    <div className="space-y-2 py-3 relative overflow-y-scroll max-h-[60%] [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <CartItem cartProduct={product} key={product.id} />
      ))}

      {products.length > 0 ? (
        <div className="fixed bottom-0 pb-4 w-[80%]">

          <Card className="border-none shadow-none ">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Subtotal </span>
                <span>{formatCurrency(subTotalPrice)}</span>
              </div>
              <Separator className="bg-[#a7a7a766]" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Descontos</span>
                <span> - {formatCurrency(totalDiscount)}</span>
              </div>
              <Separator className="bg-[#a7a7a766]" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Entrega </span>
                <span>
                  {Number(products?.[0].restaurant.deliveryFee) === 0
                    ? <span className="uppercase text-[#74cb14] font-semibold">Grátis</span>
                    : formatCurrency(Number(products?.[0].restaurant.deliveryFee))}
                </span>
              </div>

              <Separator className="bg-[#a7a7a766]" />

              <div className="flex justify-between items-center text-xs font-semibold">
                <span>Total</span>
                <span> {formatCurrency(finalPrice)}</span>
              </div>




            </CardContent>
          </Card>

          <Button className="w-full mt-2">
            Finalizar pedido
          </Button>
        </div>
      ) :
        <h2 className=" text-muted-foreground text-sm h-[90vh]  flex items-center justify-center">
          Sua sacola está vazia
        </h2>
      }


    </div>

  );
}

export default Cart;