import Image from "next/image";

export default function Home() {
  return (
    <div className="mb-19">
      <section>
        <div className="mt-5">
          <div className="container">
            <div className="rounded-4xl overflow-hidden">
              <div className="bg-primary pb-[45%]"></div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-10">
          <div className="container">
            <div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                  CATEGORY
                </h1>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3 md:gap-4 lg:gap-5">
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-10">
          <div className="container">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                PRODUCTS
              </h1>
            </div>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="w-full">
                <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full mt-2 flex items-center justify-between">
                  <h1 className="text-2xl">Shirinlik</h1>
                  <p className="text-lg">39 000 USZ</p>
                </div>
              </div>
              <div>
                <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full mt-2 flex items-center justify-between">
                  <h1 className="text-2xl">Shirinlik</h1>
                  <p className="text-lg">39 000 USZ</p>
                </div>
              </div>
              <div>
                <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full mt-2 flex items-center justify-between">
                  <h1 className="text-2xl">Shirinlik</h1>
                  <p className="text-lg">39 000 USZ</p>
                </div>
              </div>
              <div>
                <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full mt-2 flex flex-col lg:flex-row lg:items-center justify-between">
                  <h1 className="text-base lg:text-lg tracking-tight">ЛУИЗА ФАЙЗ 3 КГ</h1>
                  <p className="text-base tracking-tight">39 000 USZ</p>
                </div>
              </div>
              <div>
                <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full mt-2 flex flex-col lg:flex-row lg:items-center justify-between">
                  <h1 className="text-base lg:text-lg tracking-tight">МИНИС ВАФЛИ КРМ 2 КГ</h1>
                  <p className="text-base tracking-tight">39 000 USZ</p>
                </div>
              </div>
              <div>
                <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full mt-2 flex items-center justify-between">
                  <h1 className="text-2xl">Shirinlik</h1>
                  <p className="text-lg">39 000 USZ</p>
                </div>
              </div>
              <div>
                <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full mt-2 flex items-center justify-between">
                  <h1 className="text-2xl">Shirinlik</h1>
                  <p className="text-lg">39 000 USZ</p>
                </div>
              </div>
              <div>
                <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                  <Image
                    src={"/product.webp"}
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full mt-2 flex items-center justify-between">
                  <h1 className="text-2xl">Shirinlik</h1>
                  <p className="text-lg">39 000 USZ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
