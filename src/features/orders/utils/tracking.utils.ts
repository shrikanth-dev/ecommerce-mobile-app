import type {
  OrderStatus,
  TrackingStep,
} from "@/features/orders/types/orders.types";

export const getTrackingSteps = (
  status: OrderStatus,
  orderDate: string
): TrackingStep[] => {
  const steps: TrackingStep[] = [
    {
      id: "1",
      title: "Order Placed",
      description: "Your order has been placed successfully.",
      date: orderDate,
    },
    {
      id: "2",
      title: "Processing",
      description: "Your items are being prepared.",
    },
    {
      id: "3",
      title: "Shipped",
      description: "Your order is on its way.",
    },
    {
      id: "4",
      title: "Delivered",
      description: "Your order has been delivered successfully.",
    },
  ];

  if (status === "cancelled") {
    return [];
  }

  return steps;
};