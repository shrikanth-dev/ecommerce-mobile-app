
import { NativeTabs } from 'expo-router/native-tabs';
import { useCartStore } from "@/store/cart.store";

export default function TabsLayout() {
    const cartCount = useCartStore((state) => state.getCartCount());


  return (
    <NativeTabs tintColor="#E59E1A">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          Home
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Label>
          Orders
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="receipt_long" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="wishlist">
        <NativeTabs.Trigger.Label>
          Wishlist
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="favorite" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="cart">
        <NativeTabs.Trigger.Label>
          Cart
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="shopping_cart" />

        <NativeTabs.Trigger.Badge hidden={cartCount === 0}>
        {cartCount > 99 ? "99+" : String(cartCount)}
        </NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
