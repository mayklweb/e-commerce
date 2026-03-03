"use client";
import { useSelector } from "react-redux";
import { List } from "./ui";
import { RootState } from "../store";

function CartIcon() {
  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <section>
      <div className="w-full h-full mt-5 mb-36">
        <div className="container">
          <div className="w-full h-full">
            <div className="w-full h-full">
              {cart.length === 0 ? (
                <div className="w-full h-full items-center justify-center">
                  <p className="text-lg">Sizning savatingiz bo'sh</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                      SAVAT
                    </h1>
                  </div>
                  <List cart={cart} />
                  <div className="hidden md:block w-2/6 bg-primary/10 rounded-4xl"></div>
                </div>
              )}
              {/* <List cart={cart} /> */}
              {/* <div className="hidden md:block w-2/6 bg-primary/10 rounded-4xl"></div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartIcon;
