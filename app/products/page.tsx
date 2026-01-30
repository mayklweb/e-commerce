"use client";
import { useDispatch, useSelector } from "react-redux";
import { FilterDrawer } from "./ui";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { getProducts } from "../store/actions/productsAction";
import { getCategories } from "../store/actions/categoriesAction";
import { getBrands } from "../store/actions/brandsAction";
import ProductsList from "./ui/ProductsList/ProductsList";

function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { brands } = useSelector((state: RootState) => state.brands);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { products } = useSelector((state: RootState) => state.products);

  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeBrand, setActiveBrand] = useState<number | null>(null);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === null || product.category_id === activeCategory;

    const brandMatch = activeBrand === null || product.brand_id === activeBrand;

    return categoryMatch && brandMatch;
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  return (
    <div className="mt-5 mb-20">
      <div className="container">
        <div>
          <div className="flex items-center justify-between">
            <h2>Products</h2>

            <FilterDrawer
              categories={categories}
              brands={brands}
              activeBrand={activeBrand}
              setActiveBrand={setActiveBrand}
            />
          </div>
          {/* <div className="overflow-y-scroll flex py-2 gap-3 mt-2">
            {categories.map(({ name }, i) => (
              <button
                key={i}
                className="py-2 px-4 bg-secondary rounded-md text-nowrap text-sm text-primary"
              >
                {name}
              </button>
            ))}
          </div> */}
          <div className="overflow-y-scroll flex py-2 gap-3 mt-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`py-2 px-4 rounded-md text-sm ${
                activeCategory === null
                  ? "bg-primary text-white"
                  : "bg-secondary text-primary"
              }`}
            >
              All
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
          <div className="gap-5">
            <div className="flex">
              <div></div>
            </div>
            {/* <ProductsList
              products={products.map((product) => ({
                ...product,
                images: product.images || [],
              }))}
            /> */}
            <ProductsList
              products={filteredProducts.map((product) => ({
                ...product,
              }))}
            />

            {/* <div>{products.map((product) => (<div key={product.id}>{product.name}</div>))}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
