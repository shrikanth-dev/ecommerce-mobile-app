import type { HomeProduct } from "@/features/home/types/home.types";

export type WishlistState = {
  wishlist: HomeProduct[];
  addToWishlist: (product: HomeProduct) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: HomeProduct) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
};