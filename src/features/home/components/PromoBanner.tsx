import { useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

export default function PromoBanner() {
const [isImageLoading, setIsImageLoading] = useState(true);
const [hasImageError, setHasImageError] = useState(false);

  return (
    <View className="mx-5 mt-6 overflow-hidden rounded-3xl bg-primary p-5">
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Special offer
          </Text>

          <Text className="mt-2 text-2xl font-extrabold text-white">
            Fresh deals,{'\n'}fresh savings!
          </Text>

          <Text className="mt-2 text-sm text-white/90">
            Get up to 30% off on your first order.
          </Text>

          <Pressable className="mt-4 self-start rounded-full bg-white px-5 py-2.5"
          accessibilityRole="button"
          accessibilityLabel="Shop now"
          >
            <Text className="text-sm font-bold text-primary">
              Shop now →
            </Text>
          </Pressable>
        </View>

         {/* Promotional image */}
        <View className="ml-2 h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
          {!hasImageError && (
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
              }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageLoading(false);
                setHasImageError(true);
              }}
            />
          )}

          {isImageLoading && !hasImageError && (
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-xs text-white/80">Loading...</Text>
            </View>
          )}

          {hasImageError && (
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-4xl">🥑</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
