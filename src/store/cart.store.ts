import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartState } from "@/features/cart/types/cart.types";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const existingItem = get().items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, quantity: 1 }],
          }));
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== productId
          ),
        }));
      },

      increaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.product.id !== productId) return [item];

            if (item.quantity <= 1) return [];

            return [{ ...item, quantity: item.quantity - 1 }];
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartCount: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            Number(item.product.price.replace(/[^0-9.]/g, "")) *
              item.quantity,
          0
        );
      },
    }),
    {
      name: "flashcart-cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
