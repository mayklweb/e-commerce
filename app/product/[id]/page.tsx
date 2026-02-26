import ProductClient from "./ProductClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const res = await fetch("https://api.bunyodoptom.uz/api/v1/products");
  const data = await res.json();

  return data.data.map((product: { id: string | number }) => ({
    id: String(product.id),
  }));
}

// export default async function ProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params; // ✅ unwrap
//   return <ProductClient id={id} />;
// }

// export default function ProductPage({ params }: { params: { id: string } }) {
//   // your existing page code
//   return <ProductClient id={params.id} />;
// }

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return <ProductClient id={id} />;
}
