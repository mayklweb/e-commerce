"use client";
import { useCategories } from "../shared/lib/hooks/useCategories";
import { CategoryCard } from "../components";
import { CategoriesType } from "../types";

function Categories() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <section>
      <div className="container">
        <div className="mt-24 pb-24">
          <div className="w-full flex flex-col gap-3 items-end justify-between bg-white">
            <div className="w-full">
              <h1 className="font-medium text-black text-2xl tracking-tight leading-[100%] ">
                Katalog
              </h1>
            </div>

            {/* <div className="w-full flex items-center justify-end gap-4">
              <button className="px-10 py-3.5 bg-[#d4b6b6] rounded-lg border-black font-medium text-black text tracking-tight leading-3">
                Saralash
              </button>

              <button className="px-10 py-3.5 bg-[#d4b6b6] rounded-lg border-black font-medium text-black text tracking-tight leading-3">
                FIlter
              </button>
            </div> */}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            {categories.slice(1).map((category: CategoriesType) => (
              <CategoryCard category={category} />
            ))}
            {/* <div className="w-full h-full p-2 flex flex-col gap-2 bg-accent rounded-xl overflow-hidden">
              <div className="rounded-xl overflow-hidden">
                <Image src="/candy.webp" alt="Candy" width={200} height={120} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-center">Konfetlar</h1>
              </div>
            </div>
            <div className="w-full h-full p-2 flex flex-col gap-2 bg-accent rounded-xl overflow-hidden">
              <div className="rounded-xl overflow-hidden">
                <Image src="/candy.webp" alt="Candy" width={200} height={120} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-center">Konfetlar</h1>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
