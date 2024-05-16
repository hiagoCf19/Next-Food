
import { Prisma } from "@prisma/client";
import ProductItem from "./products-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
        }
      }
    }
  }>[]
}
const ProductList = ({ products }: ProductListProps) => {


  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5 sm:px-20 ">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}

    </div>
  );
}

export default ProductList;