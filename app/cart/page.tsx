import Image from "next/image";
import React from "react";

function CartIcon() {
  return (
    <section>
      <div>
        <div className="container">
          <div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                SAVAT
              </h1>
            </div>
            <div className="flex">
              <div className="w-full lg:w-4/6">
                <div className="flex gap-3 lg:gap-5">
                  <div className="w-[calc(300px/2)] h-[calc(225px/2)] md:w-[calc(300px/1.5)] md:h-[calc(225px/1.5)] rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                    <Image
                      src={"/product.webp"}
                      alt={""}
                      width={300}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div>
                      <h3 className="text-base md:text-2xl lg:text-3xl font-semibold tracking-tight">
                        АЛПИНА КАРАМЕЛ КРМ 0.5 КГ
                      </h3>
                      <p className="text-sm md:text-xl lg:text-2xl font-semibold tracking-tight text-end">
                        39 000 USZ
                      </p>
                    </div>
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-3 border border-[#cccccc] border-solid rounded-lg ">
                        <button
                          className="p-1 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-minus"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                          </svg>
                        </button>
                        <p>1</p>
                        <button className="p-1 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button className="p-1 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trash2 lucide-trash-2"
                            aria-hidden="true"
                          >
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-[#E0E0E0] border-solid py-3">
                  <div className="rounded-xl overflow-hidden w-[160px] h-[110px]">
                    <Image
                      src={"/product.webp"}
                      alt="ВЕЛЛА 1 ШТУКА"
                      width="180"
                      height={120}
                    />
                  </div>
                  <div className="flex flex-col flex-auto justify-between">
                    <div>
                      <h3 className="text-base md:text-2xl lg:text-3xl font-semibold tracking-tight">
                        АЛПИНА КАРАМЕЛ КРМ 0.5 КГ
                      </h3>
                      <p className="text-sm text-end">27000.00 USZ</p>
                    </div>
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-3 border border-[#cccccc] border-solid rounded-lg ">
                        <button
                          className="p-1 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-minus"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                          </svg>
                        </button>
                        <p>1</p>
                        <button className="p-1 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button className="p-1 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trash2 lucide-trash-2"
                            aria-hidden="true"
                          >
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-2/6 bg-primary/10 rounded-4xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartIcon;
