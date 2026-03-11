const products = [
  {
    id: 1,
    name: "ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ",
    price: "30700.00 USZ",
  },
  {
    id: 2,
    name: "ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ",
    price: "30700.00 USZ",
  },
  {
    id: 3,
    name: "ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ",
    price: "30700.00 USZ",
  },
  {
    id: 4,
    name: "ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ",
    price: "30700.00 USZ",
  },
  {
    id: 5,
    name: "ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ",
    price: "30700.00 USZ",
  },
  {
    id: 6,
    name: "ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ",
    price: "30700.00 USZ",
  },
  {
    id: 7,
    name: "ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ",
    price: "30700.00 USZ",
  },
  {
    id: 8,
    name: "ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ",
    price: "30700.00 USZ",
  },
];

function Products() {
  return (
    <section>
      <div className="container">
        <div>
          {/* <h1 className="text-xl font-semibold">Sizga yoqadiganlar</h1> */}
          <div className="w-full flex flex-col gap-3 items-end justify-between bg-white">
            <div className="w-full">
              <h1 className="font-medium text-black text-2xl tracking-tight leading-[100%] ">
                Mahsulotlar: Konfetlar
              </h1>
            </div>

            <div className="w-full flex items-center justify-end gap-4">
              <button className="px-10 py-4 bg-[#d4b6b6] rounded-lg border-black font-medium text-black text tracking-tight leading-3">
                Saralash
              </button>

              <button className="px-10 py-4 bg-[#d4b6b6] rounded-lg border-black font-medium text-black text tracking-tight leading-3">
                FIlter
              </button>
            </div>
          </div>
          <div className="mt-6 mb-10 grid grid-cols-2 gap-4">
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
          <div className="w-full h-16">
            <button className="mb-24 w-full h-full text-white text-xl cursor-pointer bg-[#2e3192] rounded-2xl">
              KOPROQ KORISH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
