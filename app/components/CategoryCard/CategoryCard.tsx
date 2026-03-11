import { CategoriesType } from "@/app/types";
import Image from "next/image";

interface Props {
  category: CategoriesType;
}

function CategoryCard({ category }: Props) {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2 bg-accent rounded-xl overflow-hidden">
      <div className="rounded-xl overflow-hidden">
        <Image src="/candy.webp" alt="Candy" width={200} height={120} />
      </div>
      <div>
        <h1 className="text-sm font-semibold text-center">{category.name}</h1>
      </div>
    </div>
  );
}

export default CategoryCard;
