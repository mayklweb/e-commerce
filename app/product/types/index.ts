export interface ProductType {
  id: number;
  name: string;
  images: { url: string }[];
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  stock: number;
  createdAt: string;
  updatedAt: string;
}
