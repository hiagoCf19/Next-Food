import { db } from "../lib/prisma";
import CategoryItem from "./category-Item";

const CategoryList = async () => {
  const categories = await db.category.findMany({})
  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5 sm:px-40">

      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;