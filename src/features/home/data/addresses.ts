
import type { DeliveryAddress } from "@/features/checkout/types/address.types";

export const initialAddresses: DeliveryAddress[] = [
  {
    id: "addr-1",
    fullName: "Rahul",
    phone: "9876543210",
    houseNumber: "Madhapur",
    street: "Near Image Hospital",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500081",
    type: "Home",
    isDefault: true,
  },
  {
    id: "addr-2",
    fullName: "Rahul",
    phone: "9876543210",
    houseNumber: "Hitech City",
    street: "Cyber Towers",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500081",
    type: "Work",
    isDefault: false,
  },
  {
    id: "addr-3",
    fullName: "Rahul",
    phone: "9876543210",
    houseNumber: "Kukatpally",
    street: "Near KPHB Metro Station",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500072",
    type: "Other",
    isDefault: false,
  },
];
