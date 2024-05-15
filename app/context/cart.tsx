"use client"
import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";
import { calculateProducTotalPrice } from "../helpers/price";


export interface CartProduct extends Prisma.ProductGetPayload<{
  include: {
    restaurant: {
      select: {
        id: true;
        deliveryFee: true;
        deliveryTimeMinutes: true;
      }
    }
  }
}> {
  quantity: number;
}
interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalQuantity: number;
  totalDiscounts: number;
  addProductToCart: ({ product, emptyCart }: {
    product: CartProduct;
    emptyCart?: boolean;
  }) => void
  decreseProductQuantity: (productId: string) => void
  increseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
  clearCart: () => void

}
export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
  addProductToCart: () => { },
  decreseProductQuantity: () => { },
  increseProductQuantity: () => { },
  removeProductFromCart: () => { },
  clearCart: () => { }
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])
  const subtotalPrice = products.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity;
  }, 0)

  const totalPrice = products.reduce((acc, product) => {
    return acc + calculateProducTotalPrice(product) * product.quantity;
  }, 0) + Number(products?.[0]?.restaurant?.deliveryFee);

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0)

  const totalDiscounts = subtotalPrice - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee)

  const clearCart: ICartContext['clearCart'] = () => {
    return setProducts([])
  }
  const decreseProductQuantity: ICartContext['decreseProductQuantity'] = (productId: string) => {
    return setProducts((prev) => (
      prev.map(cartProduct => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          }
        }
        return cartProduct;
      })
    ))
  }
  const increseProductQuantity: ICartContext['increseProductQuantity'] = (productId: string) => {
    return setProducts((prev) => (
      prev.map(cartProduct => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          }
        }
        return cartProduct;
      })
    ))
  }
  const removeProductFromCart: ICartContext['removeProductFromCart'] = (productId: string) => {
    return setProducts((prev) => prev.filter((product) => product.id !== productId))
  }
  const addProductToCart: ICartContext['addProductToCart'] = (
    { product, emptyCart }) => {
    if (emptyCart) {
      setProducts([])
    }
    // VERIFICAR SE ALGUM PRODUTO QUE ESTÁ NO CARRINHO JÁ TEM O ID DO PRODUTO QUE QUER SER ADICIONADO
    const isProductAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id);
    if (isProductAlreadyOnCart) {
      return setProducts((prev) => (
        prev.map(cartProduct => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            }
          }
          return cartProduct;
        })
      ))
    }


    setProducts(prev => [...prev, { ...product }])
  }

  return (
    <CartContext.Provider value={{
      products,
      addProductToCart,
      decreseProductQuantity,
      increseProductQuantity,
      removeProductFromCart,
      subtotalPrice,
      totalDiscounts,
      totalPrice,
      totalQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}