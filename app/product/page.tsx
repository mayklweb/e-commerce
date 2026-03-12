import Image from "next/image";
import React from "react";

function Product() {
  return (
    <section>
      <div className="container">
        <div className="mt-24 ">
          <div className="w-full flex gap-5 pb-100">
            <div className="w-1/2 flex flex-col gap-5">
              <div className="w-full rounded-xl overflow-hidden">
                <Image
                  width={300}
                  height={225}
                  src={"/product.jpg"}
                  alt={"product name"}
                  className="w-full h-full"
                />
              </div>
              <div className="w-full rounded-xl overflow-hidden">
                <Image
                  width={300}
                  height={225}
                  src={"/product.jpg"}
                  alt={"product name"}
                  className="w-full h-full"
                />
              </div>
              <div className="w-full rounded-xl overflow-hidden">
                <Image
                  width={300}
                  height={225}
                  src={"/product.jpg"}
                  alt={"product name"}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className=" w-1/2">
              <div className="sticky top-24 w-full flex flex-col gap-4">
                <h1 className=" text-4xl font-semibold">Shokoladli Pechenie</h1>

                <div className="flex items-center gap-2">
                  <p>Kategoriya</p>
                  <div className="flex-auto border-b border-dotted"></div>
                  <p>Pechenie</p>
                </div>

                <div className="flex items-center gap-2">
                  <p>Narxi</p>
                  <div className="flex-auto border-b border-dotted"></div>
                  <p>25 000 so'm</p>
                </div>

                <div className="flex items-center gap-2">
                  <p>Mavjud</p>
                  <div className="flex-auto border-b border-dotted"></div>
                  <p>120 dona</p>
                </div>

                <div className="flex items-center gap-2">
                  <p>Brend</p>
                  <div className="flex-auto border-b border-dotted"></div>
                  <p>SweetLife</p>
                </div>

                <div className="flex items-center gap-2">
                  <p>Og'irligi</p>
                  <div className="flex-auto border-b border-dotted"></div>
                  <p>500 g</p>
                </div>

                <button className="mt-4 h-12 bg-[#2e3192] text-white rounded-xl text-lg hover:opacity-90 transition">
                  Savatga qo‘shish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
