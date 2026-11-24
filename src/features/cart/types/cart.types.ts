
import type { HomeProduct } from "@/features/home/types/home.types";

export type CartItem = {
  product: HomeProduct;
  quantity: number;
};

export type CartState = {
  items: CartItem[];

  addToCart: (product: HomeProduct) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getSubtotal: () => number;
};

