
import { Text, View } from "react-native";

import type { PriceBreakdownProps } from "@/features/checkout/types/checkout.types";

export default function PriceBreakdown({
  subtotal,
  deliveryFee,
  discount,
  total,
}: PriceBreakdownProps) {
  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  return (
    <View className="mt-5 rounded-2xl border border-border bg-white p-4">
      <Text className="mb-4 text-lg font-bold text-foreground">
        Price Details
      </Text>

      <View className="flex-row justify-between">
        <Text className="text-sm text-muted">Subtotal</Text>
        <Text className="font-semibold text-foreground">
          {formatPrice(subtotal)}
        </Text>
      </View>

      <View className="mt-3 flex-row justify-between">
        <Text className="text-sm text-muted">Delivery Fee</Text>
        <Text className="font-semibold text-success">
          {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
        </Text>
      </View>

      <View className="mt-3 flex-row justify-between">
        <Text className="text-sm text-muted">Discount</Text>
        <Text className="font-semibold text-success">
          -{formatPrice(discount)}
        </Text>
      </View>

      <View className="my-4 border-t border-border" />

      <View className="flex-row justify-between">
        <Text className="text-base font-bold text-foreground">
          Total Amount
        </Text>

        <Text className="text-lg font-extrabold text-primary">
          {formatPrice(total)}
        </Text>
      </View>
    </View>
  );
}
