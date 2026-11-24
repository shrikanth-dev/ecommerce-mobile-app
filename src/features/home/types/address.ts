
import type { DeliveryAddress } from "@/features/checkout/types/address.types";

export type Address = DeliveryAddress;

export type AddressBottomSheetProps = {
  visible: boolean;
  addresses: Address[];
  selectedAddressId: string | null;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
};

export type LocationSelectorProps = {
  address: Address;
  onPress: () => void;
};
