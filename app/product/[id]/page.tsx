import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  const res = await fetch("https://api.bunyodoptom.uz/api/v1/products");
  const json = await res.json();

  // API response array ekanligini tekshir
  const products = Array.isArray(json?.data?.data) ? json.data.data : [];

  // ❗ Agar bo‘sh array bo‘lsa, static export ishlamaydi
  if (!products.length) {
    console.warn("No products found for static export");
    return [];
  }

  // ✅ har doim string qaytarish
  return products.map((product: { id: number | string }) => ({
    id: String(product.id),
  }));
}

// 👇 async page function

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ unwrap
  return <ProductClient id={id} />;
}
