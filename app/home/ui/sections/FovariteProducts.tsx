import { ProductCard } from "@/app/components";
import { useProducts } from "@/app/shared/lib/hooks/useProducts";
import { useShuffledProducts } from "@/app/shared/lib/hooks/useShuffledProducts";
import { ProductsType } from "@/app/types";

function FavoriteProducts() {
  const { data: products, isLoading, isError } = useProducts();
  const favoriteProducts = useShuffledProducts<ProductsType>(products, 10);

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
            {favoriteProducts.map((product: ProductsType, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FavoriteProducts;
