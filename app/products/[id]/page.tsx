import ProductsClient from "./ProductsClient";

export default async function Products({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return <ProductsClient id={Number(id)} />;
}
