import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OrderCard from "./OrderCard";
import OrderEmptyState from "./OrderEmptyState";

import { useOrderStore } from "@/store/order.store";

export default function OrdersScreen() {
  const orders = useOrderStore((state) => state.orders);

  // Wait for AsyncStorage to restore saved orders.
  const [hasHydrated, setHasHydrated] = useState(
    useOrderStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsubscribe = useOrderStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // Handles the case where hydration finished before this effect ran.
    setHasHydrated(useOrderStore.persist.hasHydrated());

    return unsubscribe;
  }, []);

  if (!hasHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#E59E1A" />
        <Text className="mt-3 text-sm text-muted">Loading your orders...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pb-4 pt-5">
        <Text className="text-2xl font-extrabold text-foreground">
          My Orders
        </Text>

        <Text className="mt-2 text-sm text-muted">
          Track and manage your orders.
        </Text>
      </View>

      {orders.length === 0 ? (
        <OrderEmptyState />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() =>
                router.push({
                  pathname: "/order/[orderId]",
                  params: { orderId: item.id },
                })
              }
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
