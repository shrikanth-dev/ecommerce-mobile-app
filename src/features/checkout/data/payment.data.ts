
import type { PaymentMethodOption } from "@/features/checkout/types/payment.types";

export const paymentMethods: PaymentMethodOption[] = [
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "💵",
  },
  {
    id: "upi",
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: "📱",
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard and RuPay",
    icon: "💳",
  },
];
