import Banner from "./sections/banner";
import Brands from "./sections/brends";
import Categories from "./sections/categories";
import Products from "./sections/products";

function HomePage() {
  return (
    <div className="mt-20 pb-24">
      <Banner />
      <Categories />
      <Brands />
      <Products />
    </div>
  );
}

export default HomePage;
