
import type { PriceBreakdown } from "@/features/checkout/types/checkout.types";

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;
const DISCOUNT_RATE = 0.05;

export const calculatePriceBreakdown = (
  subtotal: number
): PriceBreakdown => {
  const deliveryFee =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  const discount = Math.round(subtotal * DISCOUNT_RATE);

  const total = Math.max(0, subtotal + deliveryFee - discount);

  return {
    subtotal,
    deliveryFee,
    discount,
    total,
  };
};
