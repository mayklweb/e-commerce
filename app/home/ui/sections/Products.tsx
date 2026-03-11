import { ProductCard } from "@/app/components";
import { useProducts } from "@/app/shared/lib/hooks/useProducts";
import { ProductsType } from "@/app/types";

function Products() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <section>
      <div className="container">
        <div className="mt-5">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Sizga yoqadiganlar
            </h1>
          </div>

          <div className="mt-6 mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product: ProductsType) => (
              <ProductCard product={product} />
            ))}
          </div>
          <div className="w-full h-16">
            <button className="mb-24 w-full h-full text-white text-xl cursor-pointer bg-[#2e3192] rounded-2xl">
              KOPROQ KORISH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
