
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function OrderEmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="h-28 w-28 items-center justify-center rounded-full bg-primary/10">
        <Ionicons
          name="receipt-outline"
          size={54}
          color="#E59E1A"
        />
      </View>

      <Text className="mt-6 text-xl font-extrabold text-foreground">
        No orders yet!
      </Text>

      <Text className="mt-2 text-center text-sm leading-6 text-muted">
        Looks like you haven't placed any orders.
        Start shopping and your orders will appear here.
      </Text>

      <Pressable
        onPress={() => router.navigate("/")}
        className="mt-7 rounded-xl bg-primary px-8 py-3.5"
      >
        <Text className="font-bold text-white">
          Start Shopping
        </Text>
      </Pressable>
    </View>
  );
}
