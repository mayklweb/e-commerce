export interface ProductImageType {
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
  qty?: number | undefined
}

export interface ProductType {
  id: number;
  name: string;
  price: string;
  images?: ProductImageType[];
  category_id?: number;
  brand_id?: number;
  description?: string;
  status: string;
  stock_qty: number;
  qty?: number | undefined
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

export interface OrderType {
  id: number;
  address_id: number;
  user_id: number;
  status: string;
  payment_method: string;
  payment_status: string;
  total_amount: string;
  notes: string | null;
  idempotency_key: string | null;
  created_at: string;
  updated_at: string;
}