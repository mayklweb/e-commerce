"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCategories } from "@/app/shared/lib/hooks/useCategories";
import { useProducts } from "@/app/shared/lib/hooks/useProducts";
import { useBrands } from "@/app/shared/lib/hooks/useBrands";
import { useProductFilters } from "./shared/lib/useProductFilters";
import { FilterPanel } from "./shared/ui/FilterPanel";
import { FilterBottomSheet } from "./desktop/FilterBottomSheet";
import { ProductCard } from "../components";
import { ProductsType } from "../types";

export default function CategoryProductsPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = Number(rawId);

  // no more useCategory — find name from the already-fetched list
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: allProducts, isLoading: productsLoading } = useProducts();
  const { data: brands } = useBrands();

  const category = categories?.find((c: any) => Number(c.id) === id);

  const [sheetOpen, setSheetOpen] = useState(false);

  const {
    filters,
    setFilters,
    pendingFilters,
    setPendingFilters,
    filtered,
    activeCount,
    applyPending,
    resetPending,
    resetAll,
  } = useProductFilters(allProducts, id);

  const productsReady = !productsLoading && !!allProducts;

  return (
    <div className="flex flex-col h-full mt-24">
  

      {/* Body */}
      <div className="flex flex-1 gap-4 px-4 pb-6">

        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 overflow-y-auto">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">Filtr</h2>
              {activeCount > 0 && (
                <button
                  onClick={resetAll}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Tozalash
                </button>
              )}
            </div>
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              brands={brands}
              categories={categories}
              defaultCategoryId={id}
            />
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1 ">
          {!productsReady ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-4/3" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-4xl mb-3">📦</span>
              <p className="text-gray-500 text-sm font-medium">Mahsulot topilmadi</p>
              {activeCount > 0 && (
                <button
                  onClick={resetAll}
                  className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium"
                >
                  Filtrni tozalash
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {filtered.map((product: ProductsType) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <FilterBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        pendingFilters={pendingFilters}
        setPendingFilters={setPendingFilters}
        onApply={applyPending}
        onReset={resetPending}
        brands={brands}
        categories={categories}
        defaultCategoryId={id}
      />
    </div>
  );
}