import Image from "next/image";

function Categories() {
  return (
    <section>
      <div className="container">
        <div className="mt-24">
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full h-full p-2 flex flex-col gap-2 bg-accent rounded-xl overflow-hidden">
              <div className="rounded-xl overflow-hidden">
                <Image src="/candy.webp" alt="Candy" width={200} height={120} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-center">Konfetlar</h1>
              </div>
            </div>
            <div className="w-full h-full p-2 flex flex-col gap-2 bg-accent rounded-xl overflow-hidden">
              <div className="rounded-xl overflow-hidden">
                <Image src="/candy.webp" alt="Candy" width={200} height={120} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-center">Konfetlar</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
