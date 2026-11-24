import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import { useWishlistStore } from "@/store/wishlist.store";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "expo-router";

import type { ProductCardProps } from "../types/home.types";

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [product.image]);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isWishlisted = useWishlistStore((state) =>
    state.isWishlisted(product.id),
  );

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.product.id === product.id),
  );

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const quantity = cartItem?.quantity ?? 0;

  const handleProductPress = () => {
  router.push({
    pathname: "/product/[id]",
    params: {id: product.id},
  });
};

  return (
    <View className="w-[48%] overflow-hidden rounded-2xl border border-border bg-white p-2.5">
      {/* Product Image */}
      <View
  className={`relative h-36 overflow-hidden rounded-xl ${product.background}`}
>
  <Pressable
    onPress={handleProductPress}
    accessibilityRole="button"
    accessibilityLabel={`View ${product.name} details`}
    className="flex-1 items-center justify-center"
  >
    {!hasError && (
      <Image
        source={{ uri: product.image }}
        style={{ width: "100%", height: "100%" }}
        contentFit="contain"
        transition={200}
        cachePolicy="memory-disk"
        accessibilityLabel={product.name}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
          console.warn(`Failed to load product image: ${product.name}`);
        }}
      />
    )}

    {hasError && (
      <View className="absolute inset-0 items-center justify-center bg-background">
        <Text className="text-2xl">🛒</Text>
        <Text className="mt-2 text-xs text-muted">
          Image unavailable
        </Text>
      </View>
    )}
  </Pressable>

        {/* Discount Badge */}
        <View className="absolute left-2 top-2 z-10 rounded-md bg-success px-2 py-1">
          <Text className="text-[10px] font-extrabold text-white">
            {product.discountLabel}
          </Text>
        </View>
        {/* </View> */}

        {/* Wishlist Button */}
        <Pressable
          onPress={handleWishlistToggle}
          className="absolute right-2 top-0 z-20 h-8 w-8 items-center justify-center rounded-full bg-surface"
          accessibilityRole="button"
          accessibilityLabel={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          accessibilityState={{ selected: isWishlisted }}
        >
          <Text
            className={`text-lg ${isWishlisted ? "text-red-500" : "text-muted"}`}
          >
            {isWishlisted ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      {/* Product Details */}
      <View className="px-1 pb-1 pt-3">
<Pressable
  onPress={handleProductPress}
  accessibilityRole="button"
  accessibilityLabel={`View ${product.name} details`}
>
  <Text numberOfLines={1} className="text-sm font-bold text-foreground">
    {product.name}
  </Text>

  <Text numberOfLines={1} className="mt-1 text-xs text-muted">
    {product.description}
  </Text>
</Pressable>

        {/* Pricing and Cart Action */}
        <View className="mt-3 flex-row items-center justify-between">
          <View>
            <Text className="text-base font-extrabold text-foreground">
              {product.price}
            </Text>
            <Text className="text-xs text-muted line-through">
              {product.oldPrice}
            </Text>
          </View>

          {quantity === 0 ? (
            <Pressable
              onPress={() => addToCart(product)}
              className="h-9 w-9 items-center justify-center rounded-xl bg-primary"
              accessibilityRole="button"
              accessibilityLabel={`Add ${product.name} to cart`}
            >
              <Text className="text-xl font-bold text-white">+</Text>
            </Pressable>
          ) : (
            <View className="flex-row items-center gap-3 rounded-xl bg-primary px-2 py-1">
              <Pressable
                onPress={() => decreaseQuantity(product.id)}
                accessibilityRole="button"
                accessibilityLabel={`Decrease ${product.name} quantity`}
              >
                <Text className="text-xl font-bold text-white">−</Text>
              </Pressable>

              <Text className="min-w-4 text-center text-sm font-bold text-white">
                {quantity}
              </Text>

              <Pressable
                onPress={() => increaseQuantity(product.id)}
                accessibilityRole="button"
                accessibilityLabel={`Increase ${product.name} quantity`}
              >
                <Text className="text-xl font-bold text-white">+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
