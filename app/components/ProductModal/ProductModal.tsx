"use client";
import { ProductsType } from "@/app/types";
import {
  CloseIcon,
  FavoriteIcon,
  MinusIcon,
  PlusIcon,
} from "@/app/shared/icons";
import Image from "next/image";
import { useCartStore } from "@/app/store/CartStore";
import { useFavoritesStore } from "@/app/store/favoritesStore";

interface Props {
  product: ProductsType | null;
  onClose: () => void;
}

function ProductModal({ product, onClose }: Props) {
  const { addToCart, inc, dec, getQuantity, remove } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  if (!product) return null;

  const firstImage = product.images?.[0];
  const imageSrc =
    (typeof firstImage === "string" ? firstImage : firstImage?.url) ||
    "/placeholder.jpg";

  const qty = getQuantity(product.id);
  const liked = isFavorite(product.id);

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white w-200 rounded-xl relative flex gap-5 p-5"
        onClick={(e) => e.stopPropagation()} // prevent close on modal click
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <CloseIcon className="w-8 h-8" />
        </button>

        {/* Image */}
        <div className="w-1/2 relative aspect-4/3 rounded-2xl overflow-hidden">
          <Image
            src={imageSrc}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="w-1/2  flex flex-col">
          <h2 className="text-xl font-bold">{product.name}</h2>

          <div className="flex flex-col items-start justify-between mt-3">
            <p className="text-2xl font-bold">
              {product.price.toLocaleString()} so'm
            </p>
            {product.stock_qty > 0 ? (
              <span className="text-xs text-green-500 font-medium">
                Mavjud: {product.stock_qty} ta
              </span>
            ) : (
              <span className="text-xs text-red-500 font-medium">Tugagan</span>
            )}
          </div>

          {/* Extra prices */}
          {product.kg_price && (
            <p className="text-sm text-gray-400 mt-1">
              Kg narxi: {product.kg_price.toLocaleString()} so'm
            </p>
          )}
          {product.piece_price && (
            <p className="text-sm text-gray-400">
              Dona narxi: {product.piece_price.toLocaleString()} so'm
            </p>
          )}
          {/* Cart controls */}
          <div className="mt-5 flex gap-2.5">
            {qty === 0 ? (
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock_qty === 0}
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl disabled:opacity-50 cursor-pointer"
              >
                Savatga qo'shish
              </button>
            ) : (
              <div className="flex flex-auto items-center justify-between bg-accent rounded-xl p-2">
                <button
                  onClick={() =>
                    qty === 1 ? remove(product.id) : dec(product.id)
                  }
                  className="w-10 h-10 rounded-xl bg-white text-black text-xl font-bold flex items-center justify-center cursor-pointer"
                >
                  <MinusIcon />
                </button>
                <span className="font-semibold text-xl">{qty}</span>
                <button
                  onClick={() => inc(product.id)}
                  className="w-10 h-10 rounded-xl bg-white text-black text-xl font-bold flex items-center justify-center cursor-pointer"
                >
                  <PlusIcon />
                </button>
              </div>
            )}
            {/* Favorite */}
            <button
              onClick={() => toggleFavorite(product)}
              className="bg-accent p-4 rounded-xl cursor-pointer"
            >
              <FavoriteIcon
                className={`w-6 h-6 transition-all ${
                  liked ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
