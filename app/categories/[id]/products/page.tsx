import Header from "@/app/components/Header";
import ProductItem from "@/app/components/products-item";
import RestaurantItem from "@/app/components/restaurant-item";
import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string
  }
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
  if (!category) {
    return notFound()
  }
  return (
    <>

      <Header />
      <div className=" px-5 py-6">
        <h2 className="mb-6 text-lg font-bold">
          {category.name}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {category?.products.map((product) => (
            <ProductItem key={product.id} product={product} className="min-w-full" />
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;