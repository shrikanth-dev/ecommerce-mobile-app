import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialAddresses } from "@/features/checkout/data/addresses.data";

import type {
  AddressState,
  DeliveryAddress,
} from "@/features/checkout/types/address.types";

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: initialAddresses,
      selectedAddressId: initialAddresses[0]?.id ?? null,

      addAddress: (address) => {
        set((state) => {
          const isFirstAddress = state.addresses.length === 0;

          const newAddress = {
            ...address,
            isDefault: isFirstAddress || address.isDefault,
          };

          const updatedAddresses = newAddress.isDefault
            ? state.addresses.map((item) => ({
                ...item,
                isDefault: false,
              }))
            : state.addresses;

          return {
            addresses: [...updatedAddresses, newAddress],
            selectedAddressId: state.selectedAddressId ?? newAddress.id,
          };
        });
      },

      updateAddress: (id, address) => {
        set((state) => {
          const existingAddress = state.addresses.find(
            (item) => item.id === id,
          );

          let updatedAddresses = sdonetate.addresses.map((item) =>
            item.id === id ? { ...address, id } : item,
          );

          if (address.isDefault) {
            updatedAddresses = updatedAddresses.map((item) => ({
              ...item,
              isDefault: item.id === id,
            }));
          } else if (
            existingAddress?.isDefault &&
            !updatedAddresses.some((item) => item.isDefault)
          ) {
            updatedAddresses = updatedAddresses.map((item, index) => ({
              ...item,
              isDefault: index === 0,
            }));
          }

          return { addresses: updatedAddresses };
        });
      },

      deleteAddress: (id) => {
        set((state) => {
          const remainingAddresses = state.addresses.filter(
            (item) => item.id !== id,
          );

          if (remainingAddresses.length === 0) {
            return {
              addresses: [],
              selectedAddressId: null,
            };
          }

          let updatedAddresses = remainingAddresses;

          if (!updatedAddresses.some((item) => item.isDefault)) {
            updatedAddresses = updatedAddresses.map((item, index) => ({
              ...item,
              isDefault: index === 0,
            }));
          }

          return {
            addresses: updatedAddresses,
            selectedAddressId:
              state.selectedAddressId === id
                ? updatedAddresses[0].id
                : state.selectedAddressId,
          };
        });
      },

      selectAddress: (id) => {
        set({ selectedAddressId: id });
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((item) => ({
            ...item,
            isDefault: item.id === id,
          })),
        }));
      },
    }),
    {
      name: "flashcart-addresses",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
