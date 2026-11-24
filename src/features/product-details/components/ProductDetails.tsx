
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useWishlistStore } from "@/store/wishlist.store";
import { useCartStore } from "@/store/cart.store";

import type { ProductDetailsProps } from "../types/product-details.types";
import ProductImageGallery from "./ProductImageGallery";


export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [showFullDescription, setShowFullDescription] =
    useState(false);

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist,
  );

  const isWishlisted = useWishlistStore((state) =>
    state.isWishlisted(product.id),
  );

  const addToCart = useCartStore((state) => state.addToCart);

  const cartItem = useCartStore((state) =>
    state.items.find(
      (item) => item.product.id === product.id,
    ),
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  );

  const quantity = cartItem?.quantity ?? 0;

  const productImages =
    product.images?.filter(Boolean).length
      ? product.images.filter(Boolean)
      : [product.image];

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Scrollable Product Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Product Image Section */}
        <View className="relative bg-white">
          <ProductImageGallery
            images={productImages}
            productName={product.name}
            background={product.background}
          />
        </View>

        {/* Product Information */}
        <View className="mt-3 rounded-t-3xl bg-white px-5 pb-8 pt-6">
          {/* Category and Availability */}
          <View className="flex-row items-center justify-between">
            <View className="rounded-full bg-primary/10 px-3 py-1.5">
              <Text className="text-xs font-bold text-primary">
                {product.category}
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="mr-2 h-2 w-2 rounded-full bg-success" />
              <Text className="text-xs font-semibold text-success">
                In Stock
              </Text>
            </View>
          </View>

          {/* Product Name and Wishlist */}
          <View className="mt-5 flex-row items-start justify-between">
            <Text className="mr-3 flex-1 text-2xl font-extrabold leading-8 text-foreground">
              {product.name}
            </Text>

            <Pressable
              onPress={handleWishlistToggle}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={
                isWishlisted
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
              accessibilityState={{ selected: isWishlisted }}
              className="h-11 w-11 items-center justify-center rounded-full border border-border bg-white"
            >
              <Text
                className={`text-2xl ${
                  isWishlisted ? "text-red-500" : "text-muted"
                }`}
              >
                {isWishlisted ? "♥" : "♡"}
              </Text>
            </Pressable>
          </View>

          {/* Product Description */}
          <View className="mt-3">
            <Text className="text-sm leading-6 text-muted">
              {showFullDescription
                ? product.description
                : product.description.length > 100
                  ? `${product.description.slice(0, 100)}...`
                  : product.description}
            </Text>

            {product.description.length > 100 && (
              <Pressable
                onPress={() =>
                  setShowFullDescription((current) => !current)
                }
                className="mt-2 self-start"
              >
                <Text className="text-sm font-bold text-primary">
                  {showFullDescription ? "Read less" : "Read more"}
                </Text>
              </Pressable>
            )}
          </View>

          {/* Pricing */}
          <View className="mt-6 rounded-2xl bg-background p-4">
            <Text className="text-xs font-medium text-muted">
              Price
            </Text>

            <View className="mt-2 flex-row flex-wrap items-center">
              <Text className="text-3xl font-extrabold text-foreground">
                {product.price}
              </Text>

              <Text className="ml-3 text-base text-muted line-through">
                {product.oldPrice}
              </Text>

              <View className="ml-3 mt-1 rounded-md bg-success/10 px-2 py-1">
                <Text className="text-xs font-bold text-success">
                  {product.discountLabel}
                </Text>
              </View>
            </View>
          </View>

          {/* Product Information */}
          <View className="mt-7">
            <Text className="text-lg font-extrabold text-foreground">
              Product Information
            </Text>

            <View className="mt-4 overflow-hidden rounded-2xl border border-border">
              {/* Product Name */}
              <View className="flex-row items-center justify-between px-4 py-4">
                <Text className="text-sm text-muted">
                  Product Name
                </Text>

                <Text
                  numberOfLines={1}
                  className="ml-4 max-w-[60%] text-right text-sm font-semibold text-foreground"
                >
                  {product.name}
                </Text>
              </View>

              <View className="h-px bg-border" />

              {/* Category */}
              <View className="flex-row items-center justify-between px-4 py-4">
                <Text className="text-sm text-muted">
                  Category
                </Text>

                <Text className="text-sm font-semibold text-foreground">
                  {product.category}
                </Text>
              </View>

              <View className="h-px bg-border" />

              {/* Availability */}
              <View className="flex-row items-center justify-between px-4 py-4">
                <Text className="text-sm text-muted">
                  Availability
                </Text>

                <View className="flex-row items-center">
                  <View className="mr-2 h-2 w-2 rounded-full bg-success" />
                  <Text className="text-sm font-semibold text-success">
                    In Stock
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Purchase Bar */}
      <View
        className="border-t border-border bg-white px-5 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <View className="flex-row items-center gap-3">
          {quantity === 0 ? (
            <Pressable
              onPress={handleAddToCart}
              className="h-12 flex-1 flex-row items-center justify-center rounded-xl bg-primary"
              accessibilityRole="button"
              accessibilityLabel={`Add ${product.name} to cart`}
            >
              <Text className="text-base font-bold text-white">
                + Add to Cart
              </Text>
            </Pressable>
          ) : (
            <>
              {/* Quantity Selector */}
              <View className="h-12 flex-row items-center justify-between rounded-xl bg-primary px-4">
                <Pressable
                  onPress={() => decreaseQuantity(product.id)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Decrease quantity"
                >
                  <Text className="text-xl font-bold text-white">
                    −
                  </Text>
                </Pressable>

                <Text className="mx-5 min-w-4 text-center text-base font-bold text-white">
                  {quantity}
                </Text>

                <Pressable
                  onPress={() => increaseQuantity(product.id)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Increase quantity"
                >
                  <Text className="text-xl font-bold text-white">
                    +
                  </Text>
                </Pressable>
              </View>

              {/* View Cart */}
              <Pressable
                onPress={() => router.push("/(tabs)/cart")}
                className="h-12 flex-1 items-center justify-center rounded-xl bg-primary"
                accessibilityRole="button"
              >
                <Text className="text-base font-bold text-white">
                  View Cart
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
