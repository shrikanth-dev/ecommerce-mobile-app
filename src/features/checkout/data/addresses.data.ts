
import type { DeliveryAddress } from "@/features/checkout/types/address.types";

export const initialAddresses: DeliveryAddress[] = [
  {
    id: "address-1",
    fullName: "Demo User",
    phone: "9876543210",
    houseNumber: "Flat 302, Green Heights",
    street: "Madhapur Main Road",
    landmark: "Near Metro Station",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500081",
    type: "Home",
    isDefault: true,
  },
  {
    id: "address-2",
    fullName: "Demo User",
    phone: "9876543210",
    houseNumber: "Office 204, Tech Park",
    street: "HITEC City Road",
    landmark: "Near Cyber Towers",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500081",
    type: "Work",
    isDefault: false,
  },
];
