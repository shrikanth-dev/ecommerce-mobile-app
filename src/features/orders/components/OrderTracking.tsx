
import { Text, View } from "react-native";
import type { OrderTrackingProps } from "../types/orders.types";

const statusIndex = {
  confirmed: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

export default function OrderTracking({
  status,
  steps,
}: OrderTrackingProps) {
  if (status === "cancelled") {
    return (
      <View className="mt-4 rounded-xl bg-golden-tint p-4">
        <Text className="font-bold text-danger">
          Order Cancelled
        </Text>

        <Text className="mt-2 text-sm text-muted">
          This order has been cancelled and will not be delivered.
        </Text>
      </View>
    );
  }

  const currentIndex = statusIndex[status];

  return (
    <View className="mt-5">
      {steps.map((step, index) => {
        const completed = index <= currentIndex;
        const isCurrent = index === currentIndex && status !== "delivered";

        return (
          <View key={step.id} className="flex-row">
            {/* Timeline indicator */}
            <View className="mr-3 items-center">
              <View
                className={`h-7 w-7 items-center justify-center rounded-full ${
                  completed ? "bg-success" : "bg-border"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    completed ? "text-white" : "text-muted"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </Text>
              </View>

              {index !== steps.length - 1 && (
                <View
                  className={`h-12 w-0.5 ${
                    completed ? "bg-success" : "bg-border"
                  }`}
                />
              )}
            </View>

            {/* Timeline information */}
            <View className="flex-1 pb-5">
              <View className="flex-row items-center justify-between">
                <Text
                  className={`font-bold ${
                    completed ? "text-foreground" : "text-muted"
                  }`}
                >
                  {step.title}
                </Text>

                {isCurrent && (
                  <View className="rounded-full bg-golden-tint px-2 py-1">
                    <Text className="text-xs font-bold text-primary">
                      Current
                    </Text>
                  </View>
                )}
              </View>

              <Text className="mt-1 text-xs text-muted">
                {step.description}
              </Text>

              {step.date && (
                <Text className="mt-1 text-xs text-muted">
                  {step.date}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
