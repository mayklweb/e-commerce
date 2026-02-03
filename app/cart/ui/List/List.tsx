import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

function List() {
  const { cart } = useSelector((state: RootState) => state.cart);
  return (
    <div className="w-full lg:w-4/6">
      {cart.map((item) => (
        <Card item={item} />
      ))}
    </div>
  );
}

export default List;
