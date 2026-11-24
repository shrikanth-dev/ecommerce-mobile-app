
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import type { OrderDetailsScreenProps } from "../types/orders.types";
import OrderStatus from "./OrderStatus";
import OrderItemsList from "./OrderItemsList";
import OrderTracking from "./OrderTracking";
import { getTrackingSteps } from "../utils/tracking.utils";
import { useOrderStore } from "@/store/order.store";

export default function OrderDetailsScreen({
  order,
}: OrderDetailsScreenProps) {
  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  );

  const trackingSteps = getTrackingSteps(order.status, order.date);

  const handleCancelOrder = () => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "Keep Order",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            updateOrderStatus(order.id, "cancelled");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-5 py-4">
        <Text
          onPress={() => router.back()}
          className="mr-4 text-2xl text-foreground"
        >
          ‹
        </Text>

        <Text className="text-xl font-extrabold text-foreground">
          Order Details
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingTop: 4 }}
      >
        {/* Order information */}
        <View className="rounded-2xl border border-border bg-surface p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-bold text-foreground">
                {order.orderNumber}
              </Text>

              <Text className="mt-1 text-xs text-muted">
                {order.date}
              </Text>
            </View>

            <OrderStatus status={order.status} />
          </View>
        </View>

        {/* Tracking */}
        <View className="mt-4 rounded-2xl border border-border bg-surface p-4">
          <Text className="text-base font-bold text-foreground">
            Order Tracking
          </Text>

          <OrderTracking
            steps={trackingSteps}
            status={order.status}
          />
        </View>

        {/* Items */}
        <View className="mt-4 rounded-2xl border border-border bg-surface p-4">
          <Text className="text-base font-bold text-foreground">
            Order Items
          </Text>

          <OrderItemsList items={order.items} />
        </View>

        {/* Delivery address */}
        <View className="mt-4 rounded-2xl border border-border bg-surface p-4">
          <Text className="text-base font-bold text-foreground">
            Delivery Address
          </Text>

          <Text className="mt-2 text-sm text-muted">
            {order.deliveryAddress}
          </Text>
        </View>

        {/* Payment */}
        <View className="mt-4 rounded-2xl border border-border bg-surface p-4">
          <Text className="text-base font-bold text-foreground">
            Payment Details
          </Text>

          <View className="mt-3 flex-row justify-between">
            <Text className="text-sm text-muted">Payment Method</Text>
            <Text className="text-sm font-semibold text-foreground">
              {order.paymentMethod}
            </Text>
          </View>

          <View className="my-3 h-px bg-border" />

          <View className="flex-row justify-between">
            <Text className="font-bold text-foreground">
              Total Amount
            </Text>
            <Text className="font-extrabold text-primary">
              ₹{order.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Cancel order */}
        {order.status === "confirmed" && (
          <Pressable
            onPress={handleCancelOrder}
            className="mt-5 items-center rounded-xl border border-danger bg-surface py-4 active:opacity-70"
          >
            <Text className="font-bold text-danger">
              Cancel Order
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
