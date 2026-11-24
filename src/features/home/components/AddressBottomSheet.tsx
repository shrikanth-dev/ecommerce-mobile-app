
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import type { AddressBottomSheetProps } from "../types/address";

export default function AddressBottomSheet({
  visible,
  addresses,
  selectedAddressId,
  onClose,
  onSelectAddress,
}: AddressBottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="rounded-t-3xl bg-surface px-5 pb-8 pt-5">
          {/* Header */}
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-foreground">
              Select delivery address
            </Text>

            <Pressable
              onPress={onClose}
              className="h-9 w-9 items-center justify-center rounded-full bg-background"
            >
              <Text className="text-lg text-muted">✕</Text>
            </Pressable>
          </View>

          {/* Address List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="max-h-96"
          >
            {addresses.length === 0 ? (
              <Text className="py-8 text-center text-sm text-muted">
                No saved addresses. Add an address from Checkout.
              </Text>
            ) : (
              addresses.map((address) => {
                const isSelected = address.id === selectedAddressId;

                return (
                  <Pressable
                    key={address.id}
                    onPress={() => onSelectAddress(address)}
                    className={`mb-3 rounded-2xl border p-4 ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-surface"
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <View className="mb-2 flex-row items-center gap-2">
                          <Text className="font-semibold text-foreground">
                            {address.type}
                          </Text>

                          {address.isDefault && (
                            <Text className="rounded-md bg-success/10 px-2 py-1 text-xs text-success">
                              Default
                            </Text>
                          )}
                        </View>

                        <Text className="text-sm font-medium text-foreground">
                          {address.fullName} · {address.phone}
                        </Text>

                        <Text className="mt-1 text-sm leading-5 text-muted">
                          {address.houseNumber}, {address.street}
                          {address.landmark
                            ? `, ${address.landmark}`
                            : ""}
                          , {address.city}, {address.state} -{" "}
                          {address.postalCode}
                        </Text>
                      </View>

                      {/* Selection Indicator */}
                      <View
                        className={`ml-3 h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-muted"
                        }`}
                      >
                        {isSelected && (
                          <View className="h-2 w-2 rounded-full bg-surface" />
                        )}
                      </View>
                    </View>
                  </Pressable>
                );
              })
            )}
          </ScrollView>

          {/* Add Address */}
          <Pressable
            className="mt-3 flex-row items-center justify-center rounded-xl border border-dashed border-primary py-4"
            onPress={() => {
              onClose();
            }}
          >
            <Text className="text-base font-semibold text-primary">
              + Manage Addresses in Checkout
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
