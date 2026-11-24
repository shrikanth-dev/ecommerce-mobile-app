
import { Pressable, Text, View } from "react-native";
import {
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { featuredProducts } from "@/features/home/data/home.data";
import ProductDetails from "@/features/product-details/components/ProductDetails";

export default function ProductDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const product = featuredProducts.find(
    (item) => item.id === id,
  );

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (!product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-5">
        <Text className="text-lg font-bold text-foreground">
          Product not found
        </Text>

        <Text className="mt-2 text-center text-sm text-muted">
          This product may no longer be available.
        </Text>

        <Pressable
          onPress={handleGoBack}
          className="mt-5 rounded-xl bg-primary px-6 py-3"
        >
          <Text className="font-bold text-white">
            Go Back
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-background"
    >
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

      {/* Screen Header */}
      <View className="h-16 flex-row items-center border-b border-border bg-white px-4">
        <Pressable
          onPress={handleGoBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-background"
        >
          <Text className="text-3xl leading-9 text-foreground">
            ‹
          </Text>
        </Pressable>

        <Text className="text-base font-bold text-foreground">
          Product Details
        </Text>
      </View>

      <ProductDetails product={product} />
    </SafeAreaView>
  );
}
