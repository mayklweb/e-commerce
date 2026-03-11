import Image from "next/image";
import { CategoriesType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCategories } from "@/app/shared/lib/hooks/useCategories";
import { CategoryCard } from "@/app/components";

function Categories() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    router.push(`/categories?category=${slug}`);
  };

  return (
    <section>
      <div className="container">
        <div className="mt-6 mb-10 grid grid-cols-4 gap-2">
          {categories.map((category: CategoriesType) => (
            // <button onClick={() => handleCategoryClick(name)} key={id}>
            //   <div
            //     key={id}
            //     className="bg-transparent rounded-xl flex items-center justify-center flex-col gap-1 cursor-pointer"
            //   >
            //     <div className="p-2 bg-[#CECFFF] rounded-xl flex items-center justify-center">
            //       <Image
            //         src="/logo1.svg"
            //         alt="categories"
            //         width={50}
            //         height={50}
            //       />
            //     </div>
            //     <p className="text-sm lg:text-lg font-medium text-[#2e3192]">
            //       {name}
            //     </p>
            //   </div>
            // </button>
            <CategoryCard category={category}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
