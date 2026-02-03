"use client";
import { DeleteIcon, MinusIcon, PlusIcon } from "@/app/shared/icons";
import { AppDispatch } from "@/app/store";
import { dec, inc, remove } from "@/app/store/slices/cartSlice";
import { ProductsType } from "@/app/utils/types";
import Image from "next/image";
import { useDispatch } from "react-redux";

type Props = {
  item: ProductsType;
};

function Card({ item }: Props) {
  const dispatch = useDispatch<AppDispatch>();
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
            {item.name}
          </h3>
          <p className="text-base md:text-xl lg:text-2xl font-semibold tracking-tight text-end md:text-start md:mt-2">
            {item.price} USZ
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3 border border-[#cccccc] border-solid rounded-lg ">
            <button
              className="p-1 cursor-pointer"
              aria-label="Decrease quantity"
              onClick={() => dispatch(dec(item.id))}
            >
              <MinusIcon />
            </button>
            <p>{item.qty}</p>
            <button
              className="p-1 cursor-pointer"
              onClick={() => dispatch(inc(item.id))}
            >
              <PlusIcon />
            </button>
          </div>
          <div>
            <button
              className="p-1 cursor-pointer"
              onClick={() => dispatch(remove(item.id))}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
