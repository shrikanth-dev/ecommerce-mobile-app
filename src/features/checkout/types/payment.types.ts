
export type PaymentMethod = "cod" | "upi" | "card";

export type PaymentMethodOption = {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: string;
};

export type PaymentMethodSelectorProps = {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
};
