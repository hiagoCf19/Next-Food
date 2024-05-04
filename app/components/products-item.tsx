import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import { calculateProducTotalPrice, formatCurrency } from "../helpers/price";
import { ArrowDownIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
        }
      }
    }
  }>
}
const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/products/${product.id}`} className="w-[150px] min-w-[150px]">
      <div className="space-y-2 w-full">
        {/* Imagem */}
        <div className="h-[150px] w-full relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-md" />
          {product.discountPercentage > 0 && (
            <div className="absolute gap-[2px] top-2 left-2 bg-primary px-2 py-[2px] rounded-full flex text-zinc-50 items-center ">
              <ArrowDownIcon size={12} />
              <span className="font-semibold text-xs">{product.discountPercentage}%</span>
            </div>

          )}
        </div>

        {/* TITULO PREÇO E RESTAURANTE */}
        <div>
          <h2 className=" text-sm truncate">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {formatCurrency(calculateProducTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="line-through text-muted-foreground text-xs">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>
          <span className="block text-muted-foreground text-xs">{product.restaurant.name}</span>
        </div>



      </div>
    </Link>

  );
}

export default ProductItem;