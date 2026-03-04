"use client";
import { useSelector } from "react-redux";
import { FilterDrawer } from "./ui";
import { RootState } from "../store";
import { useState } from "react";
import ProductsList from "./ui/ProductsList/ProductsList";

function Products() {
  const { brands } = useSelector((state: RootState) => state.brands);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { products } = useSelector((state: RootState) => state.products);

  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeBrand, setActiveBrand] = useState<number | null>(null);

  const filteredProducts = Array.isArray(products)
    ? products?.filter((product) => {
        const categoryMatch =
          activeCategory === null || product.category_id === activeCategory;

        const brandMatch =
          activeBrand === null || product.brand_id === activeBrand;

        return categoryMatch && brandMatch;
      })
    : [];

  return (
    <div className="mt-22 pb-24">
      <div className="container">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Maxsulotlar</h2>

            <FilterDrawer
              categories={categories}
              brands={brands}
              activeBrand={activeBrand}
              setActiveBrand={setActiveBrand}
            />
          </div>
          <div className="overflow-x-scroll lg:overflow-x-auto flex py-2 gap-3 mt-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`py-2 px-4 rounded-md text-sm ${
                activeCategory === null
                  ? "bg-primary text-white"
                  : "bg-secondary text-primary"
              }`}
            >
              БАРЧАСИ
            </button>

            {categories.map(({ id, name }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`py-2 px-4 rounded-md text-sm text-nowrap ${
                  activeCategory === id
                    ? "bg-primary text-white"
                    : "bg-secondary text-primary"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex lg:gap-5">
            <div className="lg:w-80 flex">
              <div>
                {/* <div>
                  {categories.map(({ id, name }) => (
                    <Link href={`/products/${name}`}
                      key={id}
                      onClick={() => setActiveBrand(id)}
                      className={`py-2 px-4 rounded-md text-sm ${
                        activeBrand === id
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {name}
                    </Link>
                  ))}
                </div> */}
              </div>
            </div>

            <ProductsList
              products={filteredProducts.map((product) => ({
                ...product,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
