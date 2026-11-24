import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Order } from "@/features/orders/types/orders.types";

type OrderConfirmationScreenProps = {
  order: Order;
};

export default function OrderConfirmationScreen({
  order,
}: OrderConfirmationScreenProps) {
  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        {/* Success Icon */}
        <View className="h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <Text className="text-5xl text-success">✓</Text>
        </View>

        {/* Confirmation Message */}
        <Text className="mt-7 text-2xl font-extrabold text-foreground">
          Order Placed!
        </Text>

        <Text className="mt-3 text-center text-sm leading-6 text-muted">
          Thank you for shopping with FlashCart. Your order has been placed
          successfully.
        </Text>

        {/* Order Summary */}
        <View className="mt-8 w-full rounded-2xl border border-border bg-white p-5">
          <Text className="text-sm text-muted">
            Order Number
          </Text>

          <Text className="mt-1 text-lg font-extrabold text-foreground">
            {order.orderNumber}
          </Text>

          <View className="my-4 h-px bg-border" />

          <View className="flex-row justify-between">
            <Text className="text-sm text-muted">
              Items
            </Text>

            <Text className="font-semibold text-foreground">
              {order.items.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </Text>
          </View>

          <View className="mt-3 flex-row justify-between">
            <Text className="text-sm text-muted">
              Payment Method
            </Text>

            <Text className="font-semibold text-foreground">
              {order.paymentMethod}
            </Text>
          </View>

          <View className="mt-3 flex-row justify-between">
            <Text className="text-sm text-muted">
              Total Amount
            </Text>

            <Text className="text-lg font-extrabold text-foreground">
              {formatPrice(order.total)}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <Pressable
          onPress={() =>
            router.replace({
              pathname: "/order/[orderId]",
              params: { orderId: order.id },
            })
          }
          className="mt-8 w-full items-center rounded-xl bg-primary py-4"
        >
          <Text className="font-bold text-foreground">
            View Order Details
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/orders")}
          className="mt-3 w-full items-center rounded-xl border border-border bg-white py-4"
        >
          <Text className="font-bold text-foreground">
            My Orders
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/")}
          className="mt-5 py-2"
        >
          <Text className="font-semibold text-muted">
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}