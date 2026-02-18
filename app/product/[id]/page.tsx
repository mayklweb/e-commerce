import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  const res = await fetch("https://api.bunyodoptom.uz/api/v1/products");
  const json = await res.json();

  const products = Array.isArray(json?.data?.data) ? json.data.data : [];

  return products.map((product: { id: number | string }) => ({
    id: String(product.id), // MUST be string
  }));
}

// 👇 async page function
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // params is Promise now
}) {
  const { id } = await params; // ✅ unwrap Promise
  console.log("SERVER ID:", id);

  return <ProductClient id={id} />; // now id is defined
}
