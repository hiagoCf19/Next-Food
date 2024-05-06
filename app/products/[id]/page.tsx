import { Button } from "@/app/components/ui/button";
import { calculateProducTotalPrice, formatCurrency } from "@/app/helpers/price";
import { db } from "@/app/lib/prisma";
import { ArrowDownIcon, ChevronLeft, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./components/product-image";
import DiscountBadge from "@/app/components/discountBadge";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: {
    id: string
  }
}
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    }
  })
  if (!product) {
    return notFound()
  }
  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      }
    },
    include: {
      restaurant: true,
    }
  })
  return (
    <div>
      {/* IMAGE */}
      <ProductImage product={product} />
      {/* TITULO E PREÇO */}
      <ProductDetails product={product} complementaryProducts={juices} />

    </div>
  );
}
export default ProductPage;