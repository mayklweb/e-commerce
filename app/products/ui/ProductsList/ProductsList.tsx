import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 100;

type ImageType = {
  url: string;
};

type ProductsType = {
  id: string | number;
  name: string;
  price: number | string;
  images: ImageType[];
};

type Props = {
  products: ProductsType[];
};

function ProductsList({ products }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // pagination logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return products.slice(start, end);
  }, [products, currentPage]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        {paginatedProducts.map((product, i) => (
          <Link href={`/product/${product.id}`} key={i} className="w-full">
            <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
              <Image
                // src={`https://api.bunyodoptom.uz/${product.images[0]?.url} ${}`}
                src={
                  product.images?.length && product.images[0]?.url
                    ? `https://api.bunyodoptom.uz${product.images[0].url}`
                    : "/product.webp" // fallback
                }
                width={400}
                height={360}
                alt="Product Image"
              />
            </div>
            <div className="w-full mt-2 flex flex-col lg:flex-row lg:items-center justify-between">
              <h1 className="text-base lg:text-lg tracking-tight">
                {product.name}
              </h1>
              <p className="text-base tracking-tight">{product.price} USZ</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductsList;
