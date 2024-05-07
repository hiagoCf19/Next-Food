import Image from "next/image";
import { CartContext, CartProduct } from "../context/cart";
import { calculateProducTotalPrice, formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct
}
const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreseProductQuantity,
    increseProductQuantity,
    removeProductFromCart
  } = useContext(CartContext)

  const handleDecreseQuantityClick = () => {
    decreseProductQuantity(cartProduct.id)
  }
  const handleIncreseQuantityClick = () => {
    increseProductQuantity(cartProduct.id)
  }
  const handleRemoveClick = () => {
    removeProductFromCart(cartProduct.id)
  }
  return (
    <div className="flex items-center justify-between">
      {/* IMAGEM E INFO */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg relative">
          <Image
            fill
            alt={cartProduct.name}
            src={cartProduct.imageUrl}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(calculateProducTotalPrice(cartProduct) * cartProduct.quantity)}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)}
              </span>
            )}
          </div>
          {/* QUANTIDADE */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="size-8 border border-muted-foreground hover:bg-zinc-50"
              onClick={handleDecreseQuantityClick}

            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="w-5 text-center text-sm"> {cartProduct.quantity}</span>
            <Button
              size="icon"
              className="size-8"
              onClick={handleIncreseQuantityClick}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
      {/* DELETAR PRODUTO */}
      <Button
        size={"icon"}
        variant={"ghost"}
        className=" ml-8 size-8 border border-solid border-muted-foreground "
        onClick={handleRemoveClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
}


export default CartItem;