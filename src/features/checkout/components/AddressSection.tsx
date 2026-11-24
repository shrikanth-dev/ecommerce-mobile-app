import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import AddressCard from "@/features/checkout/components/AddressCard";
import { useAddressStore } from "@/store/address.store";

import AddressFormModal from "@/features/checkout/components/AddressFormModal";
import type {
  AddressFormData,
  DeliveryAddress,
} from "@/features/checkout/types/address.types";

export default function AddressSection() {
    const [isModalVisible, setIsModalVisible] = useState(false);
const [editingAddress, setEditingAddress] =
  useState<DeliveryAddress | null>(null);


  const addresses = useAddressStore((state) => state.addresses);
  const selectedAddressId = useAddressStore(
    (state) => state.selectedAddressId
  );

  const selectAddress = useAddressStore(
    (state) => state.selectAddress
  );

  const addAddress = useAddressStore((state) => state.addAddress);
  const updateAddress = useAddressStore((state) => state.updateAddress);

  const deleteAddress = useAddressStore(
    (state) => state.deleteAddress
  );
  const setDefaultAddress = useAddressStore(
    (state) => state.setDefaultAddress
  );

  const handleSaveAddress = (addressData: AddressFormData) => {
  if (editingAddress) {
    updateAddress(editingAddress.id, {
      ...addressData,
      id: editingAddress.id,
    });

    if (addressData.isDefault) {
      setDefaultAddress(editingAddress.id);
    }
  } else {
    const newAddress: DeliveryAddress = {
      ...addressData,
      id: `address-${Date.now()}`,
    };

    addAddress(newAddress);

    if (newAddress.isDefault) {
      setDefaultAddress(newAddress.id);
    }
  }

  setIsModalVisible(false);
  setEditingAddress(null);
};

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteAddress(id),
        },
      ]
    );
  };

  

  return (
    <View className="mt-5 rounded-2xl border border-border bg-white p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold text-foreground">
            Delivery Address
          </Text>
          <Text className="mt-1 text-xs text-muted">
            Select where you want your order delivered
          </Text>
        </View>

        <Text className="text-sm font-semibold text-primary">
          {addresses.length} Saved
        </Text>
      </View>

      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          isSelected={selectedAddressId === address.id}
          onSelect={() => selectAddress(address.id)}
          onEdit={() => {
              setEditingAddress(address);
  setIsModalVisible(true);
          }}
          onDelete={() => handleDelete(address.id)}
          onSetDefault={() => setDefaultAddress(address.id)}
        />
      ))}

      <Pressable
        onPress={() =>{
              setEditingAddress(null);
  setIsModalVisible(true);
        }
        }
        className="items-center rounded-xl border border-dashed border-primary py-4"
      >
        <Text className="font-bold text-primary">
          + Add New Address
        </Text>
      </Pressable>

      <AddressFormModal
  visible={isModalVisible}
  initialAddress={editingAddress}
  onClose={() => {
    setIsModalVisible(false);
    setEditingAddress(null);
  }}
  onSave={handleSaveAddress}
/>
    </View>
  );
}
