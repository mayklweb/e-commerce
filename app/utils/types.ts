interface ProductImageType {
  id?: number;
  url?: string;
}

export interface ProductsType {
  id: number;
  name: string;
  price: string;
  images?: ProductImageType[];
  category_id?: number;
  brand_id?: number;
  description?: string;
  status: string;
  stock_qty: number;
}

export interface CategoriesType {
  id: number;
  name: string;
  icon?: string;
}

export interface BrandsType {
  id: number;
  name: string;
}
