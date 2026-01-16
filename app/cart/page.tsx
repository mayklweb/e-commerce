import Image from "next/image";
import React from "react";

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
              <div className="w-full lg:w-4/6">
                <div className="flex gap-3 lg:gap-5">
                  <div className="w-[calc(300px/2)] h-[calc(225px/2)] md:w-[calc(300px/1.5)] md:h-[calc(225px/1.5)] rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                    <Image
                      src={"/product.webp"}
                      alt={""}
                      width={300}
                      height={225}
                    className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-base md:text-2xl lg:text-3xl font-semibold tracking-tight">
                      АЛПИНА КАРАМЕЛ КРМ 0.5 КГ
                    </h1>
                    <p className="text-sm md:text-xl lg:text-2xl font-semibold tracking-tight">
                      39 000 USZ
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-2/6 bg-primary/10 rounded-4xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartIcon;
