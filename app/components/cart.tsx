import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "./ui/alert-dialog";
import { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

interface CartProps {
  setIsOpen: (isOpen: boolean) => void
}
const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const { data } = useSession();
  const handleSignInClick = () => {
    signIn()
  }
  const { products,
    subtotalPrice,
    totalDiscounts,
    totalPrice,
    clearCart,
  } = useContext(CartContext)


  const handleFinishOrderClick = async () => {
    const restaurant = products[0].restaurant
    if (!data?.user) return;

    try {
      setIsSubmitLoading(true)
      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id }
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data?.user.id }
        },
        products: {
          createMany: {
            data: products.map((product) => (
              {
                productId: product.id,
                quantity: product.quantity,
              }
            ))
          }
        }

      });
      clearCart()
      setIsOpen(false)
      toast("Pedido finalizado com sucesso", {
        description: "Você pode acompanhá-lo na tela dos seus pedidos",
        action: {
          label: "Meus Pedidos",
          onClick: () => router.push("/my-orders")
        },
      })

    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitLoading(false)
    }
  }

  return (
    <>
      <div className=" py-3 relative">
        <div className="min-h-[64vh] max-h-[64vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden space-y-2 ">

          {products.map((product) => (
            <CartItem cartProduct={product} key={product.id} />
          ))}

        </div>

        {products.length > 0 ? (
          <div className="fixed sm:relative bottom-0 pb-4 w-[80%] sm:w-full ">

            <Card className="border-none shadow-none ">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Subtotal </span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>
                <Separator className="bg-[#a7a7a766]" />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Descontos</span>
                  <span> - {formatCurrency(totalDiscounts)}</span>
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
                  <span> {formatCurrency(totalPrice)}</span>
                </div>




              </CardContent>
            </Card>

            <Button
              className="w-full mt-2"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
              Concluir pedido
            </Button>
          </div>
        ) :
          <h2 className=" text-muted-foreground text-sm h-[90vh]  flex items-center justify-center">
            Sua sacola está vazia
          </h2>
        }
      </div>
      {!data?.user ?
        <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen} >
          <AlertDialogContent className="w-[90%]">
            <AlertDialogHeader>
              <AlertDialogTitle>Faça login para prosseguir</AlertDialogTitle>
              <AlertDialogDescription>
                Para realizar um pedido, é necessário estar logado no sistema. Clique em <strong className="text-primary">login</strong> para continuar. Caso não possua uma conta, ela será criada automaticamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleSignInClick} >Login</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        :
        <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen} >

          <AlertDialogContent className="w-[90%]">
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja concluir seu pedido?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleFinishOrderClick}>Concluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>}

    </>


  );
}

export default Cart;