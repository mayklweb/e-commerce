"use client";
import { useDispatch, useSelector } from "react-redux";
import { FilterDrawer } from "./ui";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getProducts } from "../store/actions/productsAction";
import { getCategories } from "../store/actions/categoriesAction";
import { getBrands } from "../store/actions/brandsAction";

function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { brands } = useSelector((state: RootState) => state.brands);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { products } = useSelector((state: RootState) => state.products);

  console.log(brands);
  console.log(categories);
  console.log(products);

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

            <FilterDrawer categories={categories} brands={brands} />
          </div>
          <div className="flex gap-5">
            <div className="flex">
              <div className="text-sm">{brands.map((brand) => (<div key={brand.id}>{brand.name}</div>))}</div>
              <div className="text-sm">{categories.map((brand) => (<div key={brand.id}>{brand.name}</div>))}</div>
              <div></div>
            </div>
            {/* <div>{products.map((product) => (<div key={product.id}>{product.name}</div>))}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
