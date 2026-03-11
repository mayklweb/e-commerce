import { FavoriteIcon } from "@/app/shared/icons";
import { ProductsType } from "@/app/types";
import Image from "next/image";

interface Props {
  product: ProductsType;
}

function ProductCard({ product }: Props) {
  return (
    <div
      key={product.id}
      className="flex flex-col items-start gap-5 border-0 shadow-none"
    >
      <div className="w-full relative">
        <button className="p-1 rounded-full absolute top-2.5 right-2.5 bg-white cursor-pointer">
          <FavoriteIcon className="w-5 lg:w-6 h-5 lg:h-6" />
        </button>
        <div className="rounded-xl overflow-hidden mb-2.5">
          <Image
            width={300}
            height={225}
            src={"/product.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-start gap-0.5 w-full">
          <h2 className="w-full font-semibold text-black text-[14px] tracking-tight leading-[100%] truncate ">
            {product.name}
          </h2>

          <p className="font-semibold text-[#000000cc] text-[14px] tracking-tight">
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
