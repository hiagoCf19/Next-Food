"use client";
import { Button } from "@/app/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
;

interface ProductImageProps {
  product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <div className="relative w-full h-[360px] sm:aspect-square sm:w-[40%] sm:h-[480px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover sm:aspect-square sm:rounded-lg"

      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-zinc-50 text-foreground hover:text-zinc-50 shadow-md sm:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
}

export default ProductImage;