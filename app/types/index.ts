export interface CategoriesType {
  id: number;
  name: string;
}

export interface ProductsType {
  id: number;
  name: string;
  price: string;
  photo: string;
  stock_qty: number;
  qty?: number;
}

export interface UserType {
  id: number; // User Telegram ID
  first_name: string; // User first name
  last_name?: string; // User last name (optional)
  phone: string; // User phone number
}
