import Banner from "./sections/banner";
import Categories from "./sections/categories";
import Products from "./sections/products";

function HomePage() {
  return (
    <div className="mt-20 pb-24">
      <Banner />
      <Categories />
      <Products />
    </div>
  );
}

export default HomePage;
