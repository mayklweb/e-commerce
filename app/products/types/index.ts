interface CategoryType {
  id: number;
  name: string;
}

interface BrandsType {
  id: number;
  name: string;
}

interface ProductsType {
  id: number;
  name: string;
  price: string;
  brand_id?: string;
  category_id?: string;
  description: string;
  images?: string[];
  status: string;
  stock_qty: number;
}
