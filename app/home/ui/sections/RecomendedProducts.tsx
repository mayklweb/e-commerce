import { ProductCard } from "@/app/components";
import ProductModal from "@/app/components/ProductModal/ProductModal";
import { useProductModal } from "@/app/shared/lib/hooks/useProductModal";
import { useProducts } from "@/app/shared/lib/hooks/useProducts";
import { useShuffledProducts } from "@/app/shared/lib/hooks/useShuffledProducts";
import { ProductsType } from "@/app/types";

function RecomendedProducts() {
  const { data: products, isLoading, isError } = useProducts();
  const recomendedProduct = useShuffledProducts<ProductsType>(products, 20);
  const { selectedProduct, openModal, closeModal } = useProductModal();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <section>
      <div className="container">
        <div className="mt-5">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Trenddagi mahsulotlar
            </h1>
          </div>
          <div className="mt-6 mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recomendedProduct.map((product: ProductsType, i) => (
              <ProductCard
                key={i}
                product={product}
                onClick={() => openModal(product)}
              />
            ))}
          </div>
        </div>
      </div>
      <ProductModal product={selectedProduct} onClose={closeModal} />
    </section>
  );
}

export default RecomendedProducts;
