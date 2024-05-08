"use client"
import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProducTotalPrice } from "../helpers/price";


export interface CartProduct extends Prisma.ProductGetPayload<{
  include: {
    restaurant: {
      select: {
        deliveryFee: true
      }
    }
  }
}> {
  quantity: number;
}
interface ICartContext {
  products: CartProduct[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  addProductToCart: ({ product, quantity, emptyCart }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => void
  decreseProductQuantity: (productId: string) => void
  increseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void

}
export const CartContext = createContext<ICartContext>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  addProductToCart: () => { },
  decreseProductQuantity: () => { },
  increseProductQuantity: () => { },
  removeProductFromCart: () => { },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0)
  }, [products])

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProducTotalPrice(product) * product.quantity;
    }, 0)
  }, [products])

  const totalDiscount = subTotalPrice - totalPrice


  const decreseProductQuantity = (productId: string) => {
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
  const increseProductQuantity = (productId: string) => {
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
  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) => prev.filter((product) => product.id !== productId))
  }
  const addProductToCart = (
    { product, quantity, emptyCart }: {
      product: Prisma.ProductGetPayload<{
        include: {
          restaurant: {
            select: {
              deliveryFee: true
            }
          }
        }
      }>,
      quantity: number,
      emptyCart?: boolean
    }
  ) => {
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
              quantity: cartProduct.quantity + quantity,
            }
          }
          return cartProduct;
        })
      ))
    }


    setProducts(prev => [...prev, { ...product, quantity: quantity }])
  }
  return (
    <CartContext.Provider value={{ products, addProductToCart, decreseProductQuantity, increseProductQuantity, removeProductFromCart, subTotalPrice, totalDiscount, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

