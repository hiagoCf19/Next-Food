import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
interface DiscountBadgeProps {
  product: Pick<Product, 'discountPercentage'>
}
const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className=" gap-[2px] top-2 left-2 bg-primary px-1 py-[2px] rounded-full flex text-zinc-50 items-center ">
      <ArrowDownIcon size={12} />
      <span className="font-semibold text-xs">{product.discountPercentage}%</span>
    </div>
  );
}

export default DiscountBadge;