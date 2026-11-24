
import { Pressable, Text, View } from "react-native";

import type { AddressCardProps } from "@/features/checkout/types/address.types";

export default function AddressCard({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <View
      className={`mb-4 rounded-2xl border bg-white p-4 ${
        isSelected ? "border-primary" : "border-border"
      }`}
    >
      {/* Selection and Address Type */}
      <Pressable
        onPress={onSelect}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected }}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <View
            className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
              isSelected ? "border-primary" : "border-muted"
            }`}
          >
            {isSelected && (
              <View className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </View>

          <Text className="font-bold text-foreground">
            {address.type}
          </Text>
        </View>

        {address.isDefault && (
          <View className="rounded-full bg-golden-tint px-3 py-1">
            <Text className="text-xs font-semibold text-primary">
              DEFAULT
            </Text>
          </View>
        )}
      </Pressable>

      {/* Address Details */}
      <Pressable onPress={onSelect} className="mt-3">
        <Text className="font-bold text-foreground">
          {address.fullName}
        </Text>

        <Text className="mt-1 text-sm leading-5 text-muted">
          {address.houseNumber}, {address.street}
          {address.landmark ? `, ${address.landmark}` : ""}
          {"\n"}
          {address.city}, {address.state} - {address.postalCode}
        </Text>

        <Text className="mt-2 text-sm font-semibold text-foreground">
          Phone: {address.phone}
        </Text>
      </Pressable>

      {/* Actions */}
      <View className="mt-4 flex-row items-center border-t border-border pt-3">
        <Pressable onPress={onEdit} className="mr-5">
          <Text className="text-sm font-semibold text-primary">
            Edit
          </Text>
        </Pressable>

        <Pressable onPress={onDelete}>
          <Text className="text-sm font-semibold text-danger">
            Delete
          </Text>
        </Pressable>

        {!address.isDefault && (
          <Pressable onPress={onSetDefault} className="ml-auto">
            <Text className="text-sm font-semibold text-primary">
              Set as Default
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
