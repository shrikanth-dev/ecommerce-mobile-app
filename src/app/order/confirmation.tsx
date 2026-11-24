import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import OrderConfirmationScreen from "@/features/orders/components/OrderConfirmation";
import { useOrderStore } from "@/store/order.store";

export default function OrderConfirmation() {
  const { orderId } = useLocalSearchParams<{
    orderId: string;
  }>();

  const order = useOrderStore((state) =>
    state.orders.find((item) => item.id === orderId)
  );

  if (!order) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-lg font-bold text-foreground">
          Order not found
        </Text>

        <Text className="mt-2 text-center text-sm text-muted">
          We couldn't find the order details.
        </Text>
      </View>
    );
  }

  return <OrderConfirmationScreen order={order} />;
}