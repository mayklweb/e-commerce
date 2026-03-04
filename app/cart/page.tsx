"use client";
import { useDispatch, useSelector } from "react-redux";
import { List } from "./ui";
import { AppDispatch, RootState } from "../store";
import Link from "next/link";
import { useEffect } from "react";

function CartIcon() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, totalPrice } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch({ type: "cart/totalPrice" });
  }, [cart]);
  return (
    <section>
      <div className="w-full h-full mt-22 mb-36">
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
                  <div className="w-full flex items-start gap-5">
                    <List cart={cart} />
                    <div className="hidden md:block w-2/6 p-5 bg-primary/10 rounded-2xl">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">Buyurtma:</h2>
                        <p className="text-xl capitalize font-semibold">
                          <span>Oluvchi: </span>
                          <span>{user?.name}</span>
                        </p>

                        <p className="text-xl font-semibold">
                          <span>Jami summa: </span>
                          <span className="font-bold">
                            {totalPrice.toLocaleString()} UZS
                          </span>
                        </p>
                        <Link
                          href={"/checkout"}
                          className="w-full mt-5 uppercase text-center bg-primary text-white py-2 px-4 rounded-lg hover:text-primary hover:bg-secondary transition-all ease-in-out duration-300"
                        >
                          To‘lovga o‘tish
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartIcon;
