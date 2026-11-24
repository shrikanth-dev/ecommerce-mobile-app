
import { router } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { useCartStore } from "@/store/cart.store";
import { calculatePriceBreakdown } from "@/features/checkout/utils/price.utils";

export default function Cart() {
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = useCartStore((state) => state.getSubtotal());

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const priceBreakdown = calculatePriceBreakdown(subtotal);

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: clearCart,
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-background px-4 pt-6">
      {/* Header */}
      <View className="mt-6 mb-6 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-extrabold text-foreground">
            My Cart
          </Text>

          <Text className="mt-1 text-sm text-muted">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </Text>
        </View>

        {items.length > 0 && (
          <Pressable
            onPress={handleClearCart}
            accessibilityRole="button"
            accessibilityLabel="Clear all cart items"
          >
            <Text className="font-semibold text-danger">
              Clear All
            </Text>
          </Pressable>
        )}
      </View>

      {/* Empty Cart */}
      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-6xl">🛒</Text>

          <Text className="mt-5 text-xl font-bold text-foreground">
            Your cart is empty
          </Text>

          <Text className="mt-2 text-center text-sm text-muted">
            Looks like you haven't added anything to your cart yet.
            Start shopping to fill it up!
          </Text>

          <Pressable
            onPress={() => router.replace("/")}
            className="mt-6 rounded-xl bg-primary px-6 py-3"
          >
            <Text className="font-bold text-foreground">
              Start Shopping
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Cart Products */}
          <FlatList
            className="flex-1"
            data={items}
            keyExtractor={(item) => item.product.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => {
              const { product, quantity } = item;

              return (
                <View className="mb-4 flex-row rounded-2xl border border-border bg-white p-3">
                  {/* Product Image */}
                  <View
                    className={`h-24 w-24 items-center justify-center overflow-hidden rounded-xl ${product.background}`}
                  >
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Product Details */}
                  <View className="ml-3 flex-1 justify-between">
                    <View>
                      <Text
                        numberOfLines={1}
                        className="text-sm font-bold text-foreground"
                      >
                        {product.name}
                      </Text>

                      <Text
                        numberOfLines={1}
                        className="mt-1 text-xs text-muted"
                      >
                        {product.description}
                      </Text>

                      <Text className="mt-2 text-base font-extrabold text-foreground">
                        {product.price}
                      </Text>
                    </View>

                    <View className="mt-3 flex-row items-center justify-between">
                      {/* Quantity Controls */}
                      <View className="flex-row items-center gap-3 rounded-lg bg-primary px-2 py-1">
                        <Pressable
                          onPress={() => decreaseQuantity(product.id)}
                          accessibilityRole="button"
                          accessibilityLabel={`Decrease ${product.name} quantity`}
                          hitSlop={8}
                        >
                          <Text className="text-lg font-bold text-foreground">
                            −
                          </Text>
                        </Pressable>

                        <Text className="min-w-4 text-center font-bold text-foreground">
                          {quantity}
                        </Text>

                        <Pressable
                          onPress={() => increaseQuantity(product.id)}
                          accessibilityRole="button"
                          accessibilityLabel={`Increase ${product.name} quantity`}
                          hitSlop={8}
                        >
                          <Text className="text-lg font-bold text-foreground">
                            +
                          </Text>
                        </Pressable>
                      </View>

                      {/* Remove Product */}
                      <Pressable
                        onPress={() => removeFromCart(product.id)}
                        accessibilityRole="button"
                        accessibilityLabel={`Remove ${product.name} from cart`}
                        hitSlop={8}
                      >
                        <Text className="text-xs font-semibold text-danger">
                          Remove
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={
              <View className="mb-4 rounded-2xl border border-border bg-white p-4">
                <Text className="mb-4 text-lg font-bold text-foreground">
                  Price Details
                </Text>

                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted">
                    Subtotal ({totalItems} items)
                  </Text>

                  <Text className="font-semibold text-foreground">
                    {formatPrice(priceBreakdown.subtotal)}
                  </Text>
                </View>

                <View className="mt-3 flex-row justify-between">
                  <Text className="text-sm text-muted">
                    Delivery Fee
                  </Text>

                  <Text
                    className={`font-semibold ${
                      priceBreakdown.deliveryFee === 0
                        ? "text-success"
                        : "text-foreground"
                    }`}
                  >
                    {priceBreakdown.deliveryFee === 0
                      ? "FREE"
                      : formatPrice(priceBreakdown.deliveryFee)}
                  </Text>
                </View>

                <View className="mt-3 flex-row justify-between">
                  <Text className="text-sm text-muted">
                    Discount (5%)
                  </Text>

                  <Text className="font-semibold text-success">
                    -{formatPrice(priceBreakdown.discount)}
                  </Text>
                </View>

                <View className="my-4 border-t border-border" />

                <View className="flex-row justify-between">
                  <Text className="text-base font-bold text-foreground">
                    Total Amount
                  </Text>

                  <Text className="text-lg font-extrabold text-primary">
                    {formatPrice(priceBreakdown.total)}
                  </Text>
                </View>
              </View>
            }
          />

          {/* Fixed Bottom Bar */}
          <View className="border-t border-border bg-white py-4">
            <View className="mb-3 flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-muted">
                  Total payable
                </Text>

                <Text className="mt-1 text-xl font-extrabold text-foreground">
                  {formatPrice(priceBreakdown.total)}
                </Text>
              </View>

              <Text className="text-xs text-success">
                {priceBreakdown.deliveryFee === 0
                  ? "Free delivery"
                  : `${formatPrice(priceBreakdown.deliveryFee)} delivery`}
              </Text>
            </View>

            <Pressable
              className="items-center rounded-xl bg-primary py-4"
              onPress={() => router.push("/checkout")}
              accessibilityRole="button"
              accessibilityLabel="Proceed to checkout"
            >
              <Text className="font-bold text-foreground">
                Proceed to Checkout
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
