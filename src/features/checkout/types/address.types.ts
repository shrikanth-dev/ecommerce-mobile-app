
export type AddressType = "Home" | "Work" | "Other";

export type DeliveryAddress = {
  id: string;
  fullName: string;
  phone: string;
  houseNumber: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  type: AddressType;
  isDefault: boolean;
};

export type AddressState = {
  addresses: DeliveryAddress[];
  selectedAddressId: string | null;

  addAddress: (address: DeliveryAddress) => void;
  updateAddress: (id: string, address: DeliveryAddress) => void;
  deleteAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
};

export type AddressCardProps = {
  address: DeliveryAddress;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
};

export type AddressFormData = Omit<DeliveryAddress, "id">;

export type AddressFormModalProps = {
  visible: boolean;
  initialAddress?: DeliveryAddress | null;
  onClose: () => void;
  onSave: (address: AddressFormData) => void;
};