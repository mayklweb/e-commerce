"use client";
import { Banner, Categories, Products } from "./ui/sections";

function Home() {
  return (
    <div className="mt-5">
      <Banner />
      <Categories />
      <Products />
    </div>
  );
}

export default Home;
