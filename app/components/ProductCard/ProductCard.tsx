import { FavoriteIcon } from "@/app/shared/icons";
import { useFavoritesStore } from "@/app/store/favoritesStore";
import { ProductsType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: ProductsType;
  onClick?: () => void;
}

function ProductCard({ product, onClick }: Props) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const liked = isFavorite(product.id);

  const imagePath = product?.images?.[0]?.url;

  const imageUrl = imagePath
    ? `https://api.bunyodoptom.uz${imagePath}`
    : "/placeholder.png";

  const cardClass = "flex flex-col items-start gap-5 border-0 shadow-none";

  const content = (
    <div className="w-full relative">
      <div className="rounded-xl overflow-hidden mb-2.5">
        <Image
          width={300}
          height={225}
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-0.5 w-full">
        <h2 className="w-full font-semibold text-black text-base tracking-tight leading-[100%] truncate">
          {product.name}
        </h2>
        <p className="font-semibold text-[#000000cc] text-base tracking-tight">
          {product.price?.toLocaleString()} so'm
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        onClick={() => toggleFavorite(product)}
        className="p-1 absolute top-2 right-2 z-2 bg-white rounded-full cursor-pointer"
      >
        <FavoriteIcon
          className={`w-5 h-5 transition-colors ${
            liked ? "fill-error text-error" : "text-black"
          }`}
        />
      </button>

      {onClick ? (
        <div onClick={onClick} className={`${cardClass} cursor-pointer`}>
          {content}
        </div>
      ) : (
        <Link href={`/product/${product.id}`} className={cardClass}>
          {content}
        </Link>
      )}
    </div>
  );
}

export default ProductCard;