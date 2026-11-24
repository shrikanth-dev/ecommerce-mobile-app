
import type { Order } from "../types/orders.types";
import type { TrackingStep } from "../types/orders.types";

export const mockOrders: Order[] = [
  {
    id: "ORD-1001",
    orderNumber: "#FC1001",
    date: "Nov 22, 2026",
    status: "delivered",
    items: [
      {
        id: "p1",
        name: "Fresh Red Apples",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
        quantity: 2,
        price: 120,
      },
      {
        id: "p2",
        name: "Fresh Bananas",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
        quantity: 1,
        price: 60,
      },
    ],
    total: 300,
    deliveryAddress: "Hyderabad, Telangana",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD-1002",
    orderNumber: "#FC1002",
    date: "Nov 23, 2026",
    status: "cancelled",
    items: [
      {
        id: "p3",
        name: "Fresh Milk",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
        quantity: 2,
        price: 35,
      },
      {
        id: "p4",
        name: "Brown Bread",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        quantity: 1,
        price: 45,
      },
    ],
    total: 115,
    deliveryAddress: "Hyderabad, Telangana",
    paymentMethod: "UPI",
  },
];

export const mockTrackingSteps: Record<string, TrackingStep[]> = {
  "ORD-1001": [
    {
      id: "1",
      title: "Order Placed",
      description: "Your order has been placed successfully.",
      date: "Nov 22, 2026",
    },
    {
      id: "2",
      title: "Processing",
      description: "Your items were prepared.",
      date: "Nov 22, 2026",
    },
    {
      id: "3",
      title: "Shipped",
      description: "Your order is on its way.",
      date: "Nov 22, 2026",
    },
    {
      id: "4",
      title: "Delivered",
      description: "Your order was delivered successfully.",
      date: "Nov 22, 2026",
    },
  ],

  "ORD-1002": [
    {
      id: "1",
      title: "Order Placed",
      description: "Your order has been placed successfully.",
      date: "Nov 23, 2026",
    },
    {
      id: "2",
      title: "Processing",
      description: "Your order is being prepared.",
      date: "Nov 23, 2026",
    },
    {
      id: "3",
      title: "Shipped",
      description: "Your order will be shipped soon.",
    },
    {
      id: "4",
      title: "Delivered",
      description: "Your order will be delivered.",
    },
  ],
};
