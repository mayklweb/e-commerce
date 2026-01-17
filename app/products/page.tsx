"use client";
import { FilterDrawer } from "./ui";

function Products() {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="flex items-center justify-between">
          <h2>Products</h2>

          <FilterDrawer />
        </div>
      </div>
    </div>
  );
}

export default Products;
