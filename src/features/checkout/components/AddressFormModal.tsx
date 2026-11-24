
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import type {
  AddressFormData,
  AddressFormModalProps,
  AddressType,
} from "@/features/checkout/types/address.types";

const emptyForm: AddressFormData = {
  fullName: "",
  phone: "",
  houseNumber: "",
  street: "",
  landmark: "",
  city: "",
  state: "",
  postalCode: "",
  type: "Home",
  isDefault: false,
};

const inputClass =
  "rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground";

export default function AddressFormModal({
  visible,
  initialAddress,
  onClose,
  onSave,
}: AddressFormModalProps) {
  const [form, setForm] = useState<AddressFormData>(emptyForm);

  useEffect(() => {
    if (visible) {
      if (initialAddress) {
        const { id, ...addressData } = initialAddress;
        setForm(addressData);
      } else {
        setForm(emptyForm);
      }
    }
  }, [visible, initialAddress]);

  const updateField = <K extends keyof AddressFormData>(
    field: K,
    value: AddressFormData[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const requiredFields = [
      form.fullName,
      form.phone,
      form.houseNumber,
      form.street,
      form.city,
      form.state,
      form.postalCode,
    ];

    if (requiredFields.some((value) => !value.trim())) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      Alert.alert("Invalid Phone Number", "Enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{6}$/.test(form.postalCode.trim())) {
      Alert.alert("Invalid Postal Code", "Enter a valid 6-digit postal code.");
      return;
    }

    onSave({
      ...form,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      houseNumber: form.houseNumber.trim(),
      street: form.street.trim(),
      landmark: form.landmark?.trim() || "",
      city: form.city.trim(),
      state: form.state.trim(),
      postalCode: form.postalCode.trim(),
    });
  };

  const renderInput = (
    label: string,
    field: keyof AddressFormData,
    placeholder: string,
    options?: {
      keyboardType?: "default" | "phone-pad" | "number-pad";
      required?: boolean;
    }
  ) => (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-foreground">
        {label}
        {options?.required !== false && (
          <Text className="text-danger"> *</Text>
        )}
      </Text>

      <TextInput
        value={String(form[field] ?? "")}
        onChangeText={(value) => updateField(field, value)}
        placeholder={placeholder}
        placeholderTextColor="text-muted"
        keyboardType={options?.keyboardType ?? "default"}
        className={inputClass}
        autoCapitalize="words"
      />
    </View>
  );

  const addressTypes: AddressType[] = ["Home", "Work", "Other"];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        className="flex-1 bg-background"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between border-b border-border bg-white px-4 py-4">
          <Text className="text-xl font-extrabold text-foreground">
            {initialAddress ? "Edit Address" : "Add New Address"}
          </Text>

          <Pressable onPress={onClose}>
            <Text className="text-base font-semibold text-muted">
              Cancel
            </Text>
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {renderInput("Full Name", "fullName", "Enter recipient name")}
          {renderInput("Phone Number", "phone", "10-digit mobile number", {
            keyboardType: "phone-pad",
          })}
          {renderInput("Flat / House Number", "houseNumber", "Enter house or flat number")}
          {renderInput("Street / Area", "street", "Enter street or area")}
          {renderInput("Landmark", "landmark", "Nearby landmark", {
            required: false,
          })}

          <View className="mb-4 flex-row gap-3">
            <View className="flex-1">
              {renderInput("City", "city", "City")}
            </View>
            <View className="flex-1">
              {renderInput("State", "state", "State")}
            </View>
          </View>

          {renderInput("Postal Code", "postalCode", "6-digit PIN code", {
            keyboardType: "number-pad",
          })}

          {/* Address Type */}
          <Text className="mb-3 text-sm font-semibold text-foreground">
            Save Address As
          </Text>

          <View className="mb-5 flex-row gap-3">
            {addressTypes.map((type) => {
              const selected = form.type === type;

              return (
                <Pressable
                  key={type}
                  onPress={() => updateField("type", type)}
                  className={`flex-1 items-center rounded-xl border py-3 ${
                    selected
                      ? "border-primary bg-golden-tint"
                      : "border-border bg-white"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selected ? "text-primary" : "text-muted"
                    }`}
                  >
                    {type}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Default Address */}
          <Pressable
            onPress={() => updateField("isDefault", !form.isDefault)}
            className="mb-6 flex-row items-center"
          >
            <View
              className={`mr-3 h-5 w-5 items-center justify-center rounded border ${
                form.isDefault
                  ? "border-primary bg-primary"
                  : "border-muted bg-white"
              }`}
            >
              {form.isDefault && (
                <Text className="text-xs font-bold text-white">✓</Text>
              )}
            </View>

            <Text className="text-sm font-medium text-foreground">
              Set as default address
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSave}
            className="items-center rounded-xl bg-primary py-4"
          >
            <Text className="font-bold text-white">
              {initialAddress ? "Update Address" : "Save Address"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
