import { Image, Pressable, Text, View } from "react-native";
import OrderStatus from "./OrderStatus";

import type { OrderCardProps } from "../types/orders.types";

export default function OrderCard({ order, onPress }: OrderCardProps) {
  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-2xl border border-border bg-card p-4"
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-bold text-foreground">{order.orderNumber}</Text>
          <Text className="mt-1 text-xs text-muted">{order.date}</Text>
        </View>

        <OrderStatus status={order.status} />
      </View>

      <View className="my-4 h-px bg-border" />

      <View className="flex-row items-center">
        {order.items.slice(0, 3).map((item) => (
          <Image
            key={item.id}
            source={{ uri: item.image }}
            className="mr-2 h-14 w-14 rounded-xl bg-background"
            resizeMode="cover"
          />
        ))}

        <View className="ml-2 flex-1">
          <Text className="text-sm font-semibold text-foreground">
            {itemCount} items
          </Text>
          <Text className="mt-1 text-xs text-muted">
            {order.items.map((item) => item.name).join(", ")}
          </Text>
        </View>
      </View>

      <View className="my-4 h-px bg-border" />

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xs text-muted">Total amount</Text>
          <Text className="mt-1 text-base font-extrabold text-foreground">
            ₹{order.total.toFixed(2)}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="mr-1 text-sm font-bold text-primary">
            View Details
          </Text>
          <Text className="text-primary">›</Text>
        </View>
      </View>
    </Pressable>
  );
}
