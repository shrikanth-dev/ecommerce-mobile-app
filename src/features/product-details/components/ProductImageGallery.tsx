
import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";

import type { ProductImageGalleryProps } from "../types/product-details.types";

export default function ProductImageGallery({
  images,
  productName,
  background,
}: ProductImageGalleryProps) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState<string[]>(images);

  const flatListRef = useRef<FlatList<string>>(null);

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / width,
    );

    setActiveIndex(index);
  };

  const handleImageLoad = (image: string) => {
    setLoadingImages((current) =>
      current.filter((item) => item !== image),
    );
  };

  const handleImageError = (image: string) => {
    setLoadingImages((current) =>
      current.filter((item) => item !== image),
    );

    setImageErrors((current) =>
      current.includes(image) ? current : [...current, image],
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View
            style={{ width }}
            className={`h-[320px] items-center justify-center ${background}`}
          >
            {imageErrors.includes(item) ? (
              <View className="items-center justify-center">
                <Text className="text-4xl">🛒</Text>
                <Text className="mt-2 text-sm text-muted">
                  Image unavailable
                </Text>
              </View>
            ) : (
              <>
                <Image
                  source={{ uri: item }}
                  style={{ width: "85%", height: "85%" }}
                  contentFit="contain"
                  transition={200}
                  cachePolicy="memory-disk"
                  accessibilityLabel={`${productName} image`}
                  onLoad={() => handleImageLoad(item)}
                  onError={() => handleImageError(item)}
                />

                {loadingImages.includes(item) && (
                  <View className="absolute inset-0 items-center justify-center">
                    <Text className="text-sm text-muted">
                      Loading image...
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        )}
      />

      {/* Image Pagination */}
      {images.length > 1 && (
        <View className="mt-4 flex-row items-center justify-center gap-2">
          {images.map((image, index) => (
            <View
              key={`${image}-${index}`}
              className={`h-2 rounded-full ${
                activeIndex === index
                  ? "w-6 bg-primary"
                  : "w-2 bg-border"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
