import Image from "next/image";
import React from "react";

function Product() {
  return (
    <div>
      <section>
        <div className="mt-5">
          <div className="container">
            <div>
              <div>
                <div className="rounded-3xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={600}
                    height={540}
                    alt="Product Image"
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                    <h1 className="text-xl font-semibold tracking-tight">Product Name</h1>
                    <p className="text-lg tracking-tight">39 000 USZ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="container">
            <div>
              <div>
                <h1>Oxshash narsalar</h1>
              </div>
              <div className="">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
