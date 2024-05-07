import { useContext } from "react";
import { CartContext } from "../context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../helpers/price";

const Cart = () => {
  const { products,
    subTotalPrice,
    totalPrice,
    totalDiscount,
  } = useContext(CartContext)

  return (
    <div className="spaec-y-2 py-3">
      {products.map((product) => (
        <CartItem cartProduct={product} key={product.id} />
      ))}
      <Card>
        <CardContent className="p-5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Subtotal </span>
            <span>{formatCurrency(subTotalPrice)}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Descontos</span>
            <span> - {formatCurrency(totalDiscount)}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Entrega </span>
            <span>
              {Number(products[0].restaurant.deliveryFee) === 0
                ? <span className="uppercase text-[#74cb14] font-semibold">Grátis</span>
                : formatCurrency(Number(products[0].restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Total</span>
            <span> - {formatCurrency(totalPrice)}</span>
          </div>




        </CardContent>
      </Card>
    </div>
  );
}

export default Cart;