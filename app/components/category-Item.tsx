import { Category } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category
}
const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex justify-center items-center flex-1 bg-muted shadow-lg rounded-sm px-6 py-1 relative "
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={25}


      />
      <span className="font-semibold text-sm">{category.name}</span>




    </Link>
  );
}

export default CategoryItem;