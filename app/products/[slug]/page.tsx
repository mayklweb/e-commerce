// "use client";
// import { RootState } from "@/app/store";
// import { ProductImageType, ProductType } from "@/app/utils/types";
// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { FilterDrawer } from "../ui";
// import Link from "next/link";
// import ProductsList from "../ui/ProductsList/ProductsList";
// import { cyrillicToLatin } from "@/app/utils/helpers";

// type Props = {
//   params: Promise<{ slug: string }>;
// };

// function normalizeProducts(products: ProductType[]): ProductType[] {
//   return products
//     .filter(
//       (p) => Array.isArray(p.images) && p.images.length > 0 && p.images[0]?.url,
//     )
//     .map((p) => ({
//       ...p,
//       mainImage:
//         `https://api.bunyodoptom.uz${(p?.images as ProductImageType[])[0]?.url}` &&
//         `https://api.bunyodoptom.uz${(p?.images as ProductImageType[])[1]?.url}`,
//     }));
// }

// async function Products({ params }: Props) {
//   const { slug } = await params;


//   // const { brands } = useSelector((state: RootState) => state.brands);
//   // const { categories } = useSelector((state: RootState) => state.categories);
//   const { products } = useSelector((state: RootState) => state.products);

//   const [activeCategory, setActiveCategory] = useState<number | null>(null);
//   const [activeBrand, setActiveBrand] = useState<number | null>(null);

//   const filteredProducts = Array.isArray(products)
//     ? products?.filter((product) => {
//         const categoryMatch =
//           activeCategory === null || product.category_id === activeCategory;

//         const brandMatch =
//           activeBrand === null || product.brand_id === activeBrand;

//         return categoryMatch && brandMatch;
//       })
//     : [];

//   const normalizedProducts = useMemo(
//     () => normalizeProducts(products),
//     [products],
//   );

//   useEffect(() => {
//     normalizeProducts(products);
//   }, [products]);

//   return (
//     <div className="mt-22 pb-24">
//       <div className="container">
//         <div>
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl">Maxsulotlar</h2>

//             {/* <FilterDrawer
//               categories={categories}
//               brands={brands}
//               activeBrand={activeBrand}
//               setActiveBrand={setActiveBrand}
//             /> */}
//           </div>
//           <div className="lg:hidden overflow-x-scroll lg:overflow-x-auto flex py-2 gap-3 mt-2">
//             <button
//               onClick={() => setActiveCategory(null)}
//               className={`py-2 px-4 rounded-md text-sm ${
//                 activeCategory === null
//                   ? "bg-primary text-white"
//                   : "bg-secondary text-primary"
//               }`}
//             >
//               БАРЧАСИ
//             </button>

//             {/* {categories.map(({ id, name }) => (
//               <button
//                 key={id}
//                 onClick={() => setActiveCategory(id)}
//                 className={`py-2 px-4 rounded-md text-sm text-nowrap ${
//                   activeCategory === id
//                     ? "bg-primary text-white"
//                     : "bg-secondary text-primary"
//                 }`}
//               >
//                 {name}
//               </button>
//             ))} */}
//           </div>
//           <div className="mt-5 flex lg:gap-5">
//             <div className="lg:w-80 flex">
//               <div className="hidden lg:block">
//                 <div>
//                   <h3 className="text-2xl font-semibold">Kategoriyalar</h3>
//                 </div>
//                 <div className="mt-2 flex flex-col gap-2">
//                   {categories.map(({ id, name }) => (
//                     <Link
//                       href={`/products/${cyrillicToLatin(name.toLocaleLowerCase())}`}
//                       key={id}
//                       onClick={() => setActiveBrand(id)}
//                       className={`block py-2 px-4 rounded-md text-sm ${
//                         activeBrand === id
//                           ? "bg-primary text-white"
//                           : "bg-primary/10 text-primary"
//                       }`}
//                     >
//                       {name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <ProductsList
//               products={normalizedProducts.map((product) => ({
//                 ...product,
//               }))}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Products;
