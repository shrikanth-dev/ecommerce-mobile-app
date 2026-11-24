
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AddressSection from "@/features/checkout/components/AddressSection";
import PaymentMethodSelector from "@/features/checkout/components/PaymentMethodSelector";

import { calculatePriceBreakdown } from "@/features/checkout/utils/price.utils";
import { createOrder } from "@/features/orders/utils/order.utils";

import type { PaymentMethod } from "@/features/checkout/types/payment.types";

import { useAddressStore } from "@/store/address.store";
import { useCartStore } from "@/store/cart.store";
import { useOrderStore } from "@/store/order.store";


export default function CheckoutScreen() {
const insets = useSafeAreaInsets();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("upi");

  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
    const clearCart = useCartStore((state) => state.clearCart);

  const addOrder = useOrderStore((state) => state.addOrder);

  const addresses = useAddressStore((state) => state.addresses);
  const selectedAddressId = useAddressStore(
    (state) => state.selectedAddressId
  );

  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId
  );

  const priceBreakdown = calculatePriceBreakdown(subtotal);

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  const canPlaceOrder = Boolean(selectedAddress);

  const handlePlaceOrder = () => {
        if (items.length === 0) {
      Alert.alert("Cart is empty", "Please add products before placing an order.");
      return;
    }

    if (!selectedAddress) {
      Alert.alert(
        "Delivery address required",
        "Please select or add a delivery address before proceeding."
      );
      return;
    }

     try {
      // 1. Create order snapshot
      const newOrder = createOrder({
        items,
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod,
        total: priceBreakdown.total,
      });

      // 2. Save order in Zustand store
      addOrder(newOrder);

      // 3. Clear cart after adding the order
      clearCart();

      // 4. Navigate to confirmation screen
      router.replace({
        pathname: "/order/confirmation",
        params: {
          orderId: newOrder.id,
        },
      });
    } catch (error) {
      console.error("Order creation failed:", error);

      Alert.alert(
        "Unable to place order",
        "Something went wrong while creating your order. Please try again."
      );
    }
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-5xl">🛒</Text>

        <Text className="mt-4 text-xl font-bold text-foreground">
          Your cart is empty
        </Text>

        <Text className="mt-2 text-center text-sm text-muted">
          Add some products before proceeding to checkout.
        </Text>

        <Pressable
          onPress={() => router.replace("/")}
          className="mt-6 rounded-xl bg-primary px-6 py-3"
        >
          <Text className="font-bold text-foreground">
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mt-6 mb-3 flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white"
          >
            <Text className="text-xl font-bold text-foreground">
              ←
            </Text>
          </Pressable>

          <View>
            <Text className="text-2xl font-extrabold text-foreground">
              Checkout
            </Text>
            <Text className="mt-1 text-sm text-muted">
              Delivery and payment details
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View >
          <PaymentMethodSelector
            selectedMethod={selectedPaymentMethod}
            onSelect={setSelectedPaymentMethod}
          />
        </View>

        {/* Delivery Address */}
        <AddressSection />

      </ScrollView>

      {/* Fixed Bottom Checkout Bar */}
      <View className="border-t border-border bg-white px-4 py-4"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <View className="mb-5 flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-muted">
              Total payable
            </Text>

            <Text className="mt-1 text-xl font-extrabold text-foreground">
              {formatPrice(priceBreakdown.total)}
            </Text>
          </View>

          <Text className="text-xs text-muted">
            {selectedPaymentMethod === "cod"
              ? "Cash on Delivery"
              : selectedPaymentMethod === "upi"
                ? "UPI"
                : "Credit / Debit Card"}
          </Text>
        </View>

        <Pressable
          onPress={handlePlaceOrder}
          disabled={!canPlaceOrder}
          accessibilityRole="button"
          accessibilityLabel="Place order"
          className={`items-center rounded-xl py-4 ${
            canPlaceOrder ? "bg-primary" : "bg-border"
          }`}
        >
          <Text className="font-bold text-foreground">
            {canPlaceOrder ? "Place Order" : "Select Delivery Address"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
