
import { Pressable, Text, View } from "react-native";

import { paymentMethods } from "@/features/checkout/data/payment.data";
import type {
  PaymentMethodSelectorProps,
} from "@/features/checkout/types/payment.types";

export default function PaymentMethodSelector({
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <View className="mt-5 rounded-2xl border border-border bg-white p-4">
      <Text className="text-lg font-bold text-foreground">
        Payment Method
      </Text>

      <Text className="mb-4 mt-1 text-xs text-muted">
        Choose how you want to pay
      </Text>

      {paymentMethods.map((method) => {
        const isSelected = selectedMethod === method.id;

        return (
          <Pressable
            key={method.id}
            onPress={() => onSelect(method.id)}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            className={`mb-3 flex-row items-center rounded-xl border p-3 ${
              isSelected
                ? "border-primary bg-golden-tint"
                : "border-border bg-white"
            }`}
          >
            {/* Icon */}
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-lg bg-background">
              <Text className="text-xl">{method.icon}</Text>
            </View>

            {/* Details */}
            <View className="flex-1">
              <Text className="font-bold text-foreground">
                {method.title}
              </Text>

              <Text className="mt-1 text-xs text-muted">
                {method.description}
              </Text>
            </View>

            {/* Radio */}
            <View
              className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
                isSelected ? "border-primary" : "border-muted"
              }`}
            >
              {isSelected && (
                <View className="h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </View>
          </Pressable>
        );
      })}

      <Text className="mt-1 text-xs text-muted">
        Online payments will be enabled when a payment gateway is integrated.
      </Text>
    </View>
  );
}
