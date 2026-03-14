// "use client";

// import { ProductCard } from "@/app/components";
// import { useCategory } from "@/app/shared/lib/hooks/useCategories";
// import { useProducts } from "@/app/shared/lib/hooks/useProducts";
// import { ProductsType } from "@/app/types";
// import { useRouter, useParams } from "next/navigation";

// export default function CategoryProductsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const id = Number(params.id);

//   const { data: category, isLoading: categoryLoading } = useCategory(id);
//   const { data: allProducts, isLoading: productsLoading } = useProducts();

//   const products = allProducts?.filter(
//     (p: ProductsType) => p.category_id === id
//   );

//   const isLoading = categoryLoading || productsLoading;

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 pt-5 pb-4">
//         <button
//           onClick={() => router.back()}
//           className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white shrink-0"
//         >
//           <svg
//             className="w-4 h-4 text-gray-600"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2.5}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>

//         <div className="flex-1 min-w-0">
//           {categoryLoading ? (
//             <div className="h-5 w-32 bg-gray-100 animate-pulse rounded-lg" />
//           ) : (
//             <h1 className="text-lg font-bold text-gray-900 truncate">
//               {category?.name}
//             </h1>
//           )}
//           {!isLoading && (
//             <p className="text-xs text-gray-400 mt-0.5">
//               {products?.length ?? 0} ta mahsulot
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Products grid */}
//       <div className="flex-1 overflow-y-auto px-4 pb-6">
//         {isLoading ? (
//           <div className="w-full h-full grid grid-cols-2 gap-3">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="w-full h-full rounded-2xl bg-gray-200 animate-pulse aspect-4/3"
//               />
//             ))}
//           </div>
//         ) : products?.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16 text-center">
//             <span className="text-4xl mb-3">📦</span>
//             <p className="text-gray-500 text-sm font-medium">
//               Bu kategoriyada mahsulot yo'q
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3">
//             {products?.map((product: ProductsType) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }