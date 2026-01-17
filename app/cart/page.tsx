import Image from "next/image";
import React from "react";
import { DeleteIcon } from "../shared/icons";
import { List } from "./ui";

function CartIcon() {
  return (
    <section>
      <div>
        <div className="container">
          <div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                SAVAT
              </h1>
            </div>
            <div className="flex">
              <List/>
              <div className="hidden md:block w-2/6 bg-primary/10 rounded-4xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartIcon;
