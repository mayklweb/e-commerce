"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCategories } from "@/app/shared/lib/hooks/useCategories";
import { useCategoryStore } from "@/app/store/useCategoryStore";
import { CategoriesType } from "../types";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const router = useRouter();
  const { setSelectedCategoryId } = useCategoryStore();

  const handleClick = (category: CategoriesType) => {
    setSelectedCategoryId(category.id);
    router.push(`/categories/${category.id}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 px-4 pb-24 mt-24">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-gray-100 animate-pulse aspect-square"
          />
        ))}
      </div>
    );
  }

  return (
    // lg:hidden — on desktop this page is never shown, catalog is at /categories/[id]
    <div className="flex flex-col h-full lg:hidden ">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-xl font-bold text-gray-900">Katalog</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {categories?.length ?? 0} ta kategoriya
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-24">
        {categories?.map((category: CategoriesType) => (
          <button
            key={category.id}
            onClick={() => handleClick(category)}
            className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm active:scale-[0.97] transition-transform text-left"
          >
            <div className="w-full aspect-4/3 bg-primary/5 relative overflow-hidden rounded-xl">
              <Image
                src={`${category.id}.jpg`}
                alt={category.name}
                width={300}
                height={225}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="px-2 py-2">
              <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 text-center">
                {category.name}
              </p>
            </div>
          </button>
        ))}

        {categories?.length === 0 && (
          <div className="col-span-3 text-center text-gray-400 text-sm py-12">
            Kategoriyalar topilmadi
          </div>
        )}
      </div>
    </div>
  );
}
