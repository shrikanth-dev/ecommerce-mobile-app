
import { Image, Text, View } from "react-native";
import type { OrderItemsListProps } from "../types/orders.types";


export default function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <View className="mt-4">
      {items.map((item) => (
        <View key={item.id} className="mb-4 flex-row items-center">
          <Image
            source={{ uri: item.image }}
            className="h-16 w-16 rounded-xl bg-background"
            resizeMode="cover"
          />

          <View className="ml-3 flex-1">
            <Text className="font-semibold text-foreground">
              {item.name}
            </Text>

            <Text className="mt-1 text-xs text-muted">
              Qty: {item.quantity} × ₹{item.price}
            </Text>
          </View>

          <Text className="font-bold text-foreground">
            ₹{(item.quantity * item.price).toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
}
