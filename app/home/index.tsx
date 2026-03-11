"use client";
import { Banner, Brands, Categories, FavoriteProducts, RecomendedProducts } from "./ui/sections";

function Home() {
  return (
    <div className="mt-5 pb-5">
      <Banner />
      <Categories />
      <FavoriteProducts />
      <Brands />
      <RecomendedProducts />
    </div>
  );
}

export default Home;
