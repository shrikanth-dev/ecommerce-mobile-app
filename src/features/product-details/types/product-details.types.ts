import type { HomeProduct } from "@/features/home/types/home.types";

export type ProductDetailsProps = {
  product: HomeProduct;
};

export type ProductImageGalleryProps = {
  images: string[];
  productName: string;
  background: string;
};