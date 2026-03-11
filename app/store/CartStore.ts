import { makeAutoObservable } from "mobx";
import { ProductsType } from "../types";

class CartStore {
  cart: { id: number; count: number; stock_qty: number }[] = [];

  constructor() {
    makeAutoObservable(this);
    const saved = localStorage.getItem("cart");
    this.cart = saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getQuantity(id: number) {
    const item = this.cart.find((p) => p.id === id);
    return item ? item.count : 0; // ✅ count ishlatiladi
  }

  addToCart(item: ProductsType) {

    const existing = this.cart.find((p) => p.id === item.id);
    if (existing) {
      if (existing.count < item.stock_qty) {
        existing.count += item.qty || 1;
      }
    } else {
      this.cart.push({ ...item, count: 1, stock_qty: item.stock_qty });
    }
    this.saveCart();
  }

  inc(id: number) {
    const item = this.cart.find((p) => p.id === id);
    if (item && item.count < item.stock_qty) {
      item.count += 1;
      this.saveCart();
    }
  }

  dec(id: number) {
    this.cart = this.cart.map((item) =>
      item.id === id && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    );
    this.saveCart();
  }

  remove(id: number) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}

export const cartStore = new CartStore();
