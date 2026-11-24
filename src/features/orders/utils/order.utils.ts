import type { CartItem } from "@/features/cart/types/cart.types";
import type { DeliveryAddress } from "@/features/checkout/types/address.types";
import type { PaymentMethod } from "@/features/checkout/types/payment.types";
import type { Order } from "@/features/orders/types/orders.types";

type CreateOrderParams = {
  items: CartItem[];
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  total: number;
};

const getPaymentMethodLabel = (method: PaymentMethod): string => {
  const labels: Record<PaymentMethod, string> = {
    cod: "Cash on Delivery",
    upi: "UPI",
    card: "Credit / Debit Card",
  };

  return labels[method];
};

const formatDeliveryAddress = (address: DeliveryAddress): string => {
  return [
    address.fullName,
    address.houseNumber,
    address.street,
    address.landmark,
    address.city,
    address.state,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(", ");
};

const getNumericPrice = (price: string): number => {
  return Number(price.replace(/[^0-9.]/g, ""));
};

export const createOrder = ({
  items,
  address,
  paymentMethod,
  total,
}: CreateOrderParams): Order => {
  const timestamp = Date.now();

  const orderItems = items.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    image: item.product.image,
    quantity: item.quantity,
    price: getNumericPrice(item.product.price),
  }));

  return {
    id: `ORD-${timestamp}`,
    orderNumber: `#FC${timestamp.toString().slice(-8)}`,
    date: new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "confirmed",
    items: orderItems,
    total,
    deliveryAddress: formatDeliveryAddress(address),
    paymentMethod: getPaymentMethodLabel(paymentMethod),
  };
};