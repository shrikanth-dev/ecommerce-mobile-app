
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import LocationSelector from "./LocationSelector";
import AddressBottomSheet from "./AddressBottomSheet";

import { useAddressStore } from "@/store/address.store";

export default function HomeHeader() {
  const [isAddressSheetVisible, setIsAddressSheetVisible] =
    useState(false);

  const addresses = useAddressStore((state) => state.addresses);

  const selectedAddressId = useAddressStore(
    (state) => state.selectedAddressId
  );

  const selectAddress = useAddressStore(
    (state) => state.selectAddress
  );

  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ??
    addresses.find((address) => address.isDefault) ??
    addresses[0] ??
    null;

  const handleAddressSelect = (addressId: string) => {
    selectAddress(addressId);
    setIsAddressSheetVisible(false);
  };

  return (
    <>
      <View className="flex-row items-center justify-between px-5 pt-3">
        <View className="flex-1">
          {selectedAddress ? (
            <LocationSelector
              address={selectedAddress}
              onPress={() => setIsAddressSheetVisible(true)}
            />
          ) : (
            <Pressable
              onPress={() => setIsAddressSheetVisible(true)}
            >
              <Text className="text-sm font-medium text-foreground">
                Deliver to
              </Text>
              <Text className="mt-1 text-sm font-bold text-primary">
                Add delivery address
              </Text>
            </Pressable>
          )}
        </View>

        <Pressable className="ml-3 h-11 w-11 items-center justify-center rounded-full bg-white">
          <Text className="text-xl">👤</Text>
        </Pressable>
      </View>

      <AddressBottomSheet
        visible={isAddressSheetVisible}
        addresses={addresses}
        selectedAddressId={selectedAddress?.id ?? null}
        onClose={() => setIsAddressSheetVisible(false)}
        onSelectAddress={(address) =>
          handleAddressSelect(address.id)
        }
      />
    </>
  );
}
