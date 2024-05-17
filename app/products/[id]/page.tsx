import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "./components/product-details";
import { fetch } from "@/app/page";

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
      },
      restaurant: {
        id: product.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    }
  })
  const { allCategories } = await fetch();
  return (
    <ProductDetails product={product} complementaryProducts={juices} allCategories={allCategories} />
  );
}
export default ProductPage;