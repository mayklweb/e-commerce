"use client";
import { DeleteIcon, MinusIcon, PlusIcon } from "@/app/shared/icons";
import { RootState } from "@/app/store";
import Image from "next/image";
import { useSelector } from "react-redux";

function Card() {

  const {items} = useSelector((state: RootState) => state.cart) 

  console.log(items);
  

  return (
    <div className="w-full flex gap-3 lg:gap-5 border-b border-gray py-2.5">
      <div className="w-37.5 h-[calc(225px/2)] md:w-50 md:h-37.5 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
        <Image
          src={"/product.webp"}
          alt={""}
          width={300}
          height={225}
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" flex flex-col justify-between">
        <div>
          <h3 className="text-base md:text-2xl lg:text-3xl font-semibold tracking-tight">
            АЛПИНА КАРАМЕЛ КРМ 0.5 КГ
          </h3>
          <p className="text-base md:text-xl lg:text-2xl font-semibold tracking-tight text-end md:text-start md:mt-2">
            39 000 USZ
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3 border border-[#cccccc] border-solid rounded-lg ">
            <button
              className="p-1 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <MinusIcon />
            </button>
            <p>1</p>
            <button className="p-1 cursor-pointer">
              <PlusIcon />
            </button>
          </div>
          <div>
            <button className="p-1 cursor-pointer">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
