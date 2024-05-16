import Header from "@/app/components/Header";
import ProductItem from "@/app/components/products-item";
import { db } from "@/app/lib/prisma";
import { fetch } from "@/app/page";

interface RecoommendedProducsPageProps {

}
const RecommendedProductsPage = async () => {
  const { allCategories } = await fetch();
  {/* TODO: pegar produtos com mais pedidos */ }
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        }
      }
    }
  })
  return (
    <>
      <Header categories={allCategories} />
      <div className=" px-5 py-6">
        <h2 className="mb-6 text-llg font-semibold">Produtos Recomendados</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default RecommendedProductsPage;