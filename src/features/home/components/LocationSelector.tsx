
import { Pressable, Text, View } from "react-native";

import type { LocationSelectorProps } from "../types/address";

export default function LocationSelector({
  address,
  onPress,
}: LocationSelectorProps) {
  return (
    <Pressable onPress={onPress} className="flex-1">
      <Text className="text-sm font-medium text-foreground">
        Deliver to
      </Text>

      <View className="mt-1 flex-row items-center">
        <Text
          numberOfLines={1}
          className="mr-2 flex-shrink text-sm font-bold text-foreground"
        >
          {address.houseNumber}, {address.city}
        </Text>

        <Text className="text-xs font-semibold text-amber">
          ▼
        </Text>
      </View>
    </Pressable>
  );
}
