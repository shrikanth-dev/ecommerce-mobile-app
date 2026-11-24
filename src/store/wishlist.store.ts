
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { WishlistState } from "@/features/wishlist/types/wishlist.types";

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) => {
        const alreadyExists = get().wishlist.some(
          (item) => item.id === product.id
        );

        if (alreadyExists) return;

        set((state) => ({
          wishlist: [...state.wishlist, product],
        }));
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => item.id !== productId
          ),
        }));
      },

      toggleWishlist: (product) => {
        const exists = get().wishlist.some(
          (item) => item.id === product.id
        );

        if (exists) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },

      isWishlisted: (productId) => {
        return get().wishlist.some(
          (item) => item.id === productId
        );
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },
    }),
    {
      name: "flashcart-wishlist",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
