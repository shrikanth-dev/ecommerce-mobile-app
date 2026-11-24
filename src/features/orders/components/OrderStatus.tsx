
import { Text, View } from "react-native";
import type { OrderStatusProps } from "../types/orders.types";

const statusStyles = {
  confirmed: {
    label: "Confirmed",
    container: "bg-status-confirmed-bg",
    text: "text-status-confirmed",
  },
  processing: {
    label: "Processing",
    container: "bg-status-processing-bg",
    text: "text-status-processing",
  },
  shipped: {
    label: "Shipped",
    container: "bg-status-shipped-bg",
    text: "text-status-shipped",
  },
  delivered: {
    label: "Delivered",
    container: "bg-status-delivered-bg",
    text: "text-status-delivered",
  },
  cancelled: {
    label: "Cancelled",
    container: "bg-status-cancelled-bg",
    text: "text-status-cancelled",
  },
};

export default function OrderStatus({ status }: OrderStatusProps) {
  const style = statusStyles[status];

  return (
    <View className={`rounded-full px-3 py-1 ${style.container}`}>
      <Text className={`text-xs font-bold ${style.text}`}>
        {style.label}
      </Text>
    </View>
  );
}
