export interface CategoriesType {
  id: number;
  name: string;
  icon: string;
}

export interface ProductsType {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  price: number;
  kg_price: number;
  piece_price: number;
  kg: number;
  piece: number;
  stock_qty: number;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  brand_id: number;
  images: {
    url: string;
  }[];
}

export interface UserType {
  id: number; // User Telegram ID
  first_name: string; // User first name
  last_name?: string; // User last name (optional)
  phone: string; // User phone number
}
