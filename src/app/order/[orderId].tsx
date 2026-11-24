import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import OrderDetailsScreen from "@/features/orders/components/OrderDetailsScreen";
import { useOrderStore } from "@/store/order.store";

export default function OrderDetails() {
  const { orderId } = useLocalSearchParams<{
    orderId: string;
  }>();

  const order = useOrderStore((state) =>
    state.orders.find((item) => item.id === orderId)
  );

  const [hasHydrated, setHasHydrated] = useState(
    useOrderStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsubscribe = useOrderStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    setHasHydrated(useOrderStore.persist.hasHydrated());

    return unsubscribe;
  }, []);

  if (!hasHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
        <Text className="mt-3 text-sm text-muted">
          Loading order details...
        </Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-xl font-bold text-foreground">
          Order not found
        </Text>

        <Text className="mt-2 text-center text-sm text-muted">
          We couldn't find this order. It may no longer be available.
        </Text>

        <Pressable
          onPress={() => router.replace("/orders")}
          className="mt-6 rounded-xl bg-primary px-6 py-3"
        >
          <Text className="font-bold text-foreground">
            Go to My Orders
          </Text>
        </Pressable>
      </View>
    );
  }

  return <OrderDetailsScreen order={order} />;
}