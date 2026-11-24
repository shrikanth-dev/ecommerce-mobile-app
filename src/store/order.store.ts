import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { OrderState } from "@/features/orders/types/orders.types";

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order,
          ),
        }));
      },
    }),
    {
      name: "flashcart-orders",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
