import { useState } from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";

import type { DealCardProps } from "../types/home.types";

export default function DealCard({ deal }: DealCardProps) {
  const [isLoading, setisLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <View
      className={`w-[260px] flex-row items-center justify-between overflow-hidden rounded-2xl p-4 ${deal.background}`}
    >
      {/* Deal Information */}
      <View className="flex-1">
        <View className="self-start rounded-md bg-white/80 px-2 py-1">
          <Text className="text-[9px] font-extrabold text-foreground">
            {deal.badge}
          </Text>
        </View>

        <Text className="mt-3 text-lg font-extrabold text-foreground">
          {deal.title}
        </Text>

        <Text className="mt-1 text-xs text-muted">{deal.subtitle}</Text>
      </View>

      {/* Deal Illustration */}
      <View className="relative ml-2 h-24 w-24 items-center justify-center overflow-hidden rounded-xl">
        {!hasError && (
          <Image
            source={{ uri: deal.image }}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
            transition={200}
            cachePolicy="memory-disk"
            onLoad={() => setisLoading(false)}
            onError={() => {
              setisLoading(false);
              setHasError(true);
            }}
          />
        )}

        {hasError && (
          <View className="absolute inset-0 items-center justify-center bg-background">
            <Text className="text-xs text-muted">Image unavailable</Text>
          </View>
        )}
      </View>
    </View>
  );
}
