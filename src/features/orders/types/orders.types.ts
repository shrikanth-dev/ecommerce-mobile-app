import type { PaymentMethod } from "@/features/checkout/types/payment.types";

export type OrderStatus =
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
};

export type OrderState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (
  orderId: string,
  status: OrderStatus
) => void;
};

export type OrderCardProps = {
  order: Order;
  onPress: () => void;
};

export type OrderStatusProps = {
  status: OrderStatus;
};

export type TrackingStep = {
  id: string;
  title: string;
  description: string;
  date?: string;
};

export type OrderTrackingProps = {
  status: OrderStatus;
  steps: TrackingStep[];
};

export type OrderItemsListProps = {
  items: OrderItem[];
};

export type OrderDetailsScreenProps = {
  order: Order;
};