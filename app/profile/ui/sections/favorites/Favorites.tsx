import { products } from "@/app/profile/model/constants/constants";

export function Favorites() {
    return (
      <div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-start gap-5 border-0 shadow-none"
            >
              <div className="p-0 w-full">
                <div className="w-full h-32 bg-[#8c8c8c] rounded-[10px] mb-2.5" />
  
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
          ))}
        </div>
      </div>
    );
  }