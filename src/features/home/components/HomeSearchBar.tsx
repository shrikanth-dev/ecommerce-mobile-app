import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function HomeSearchBar() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/search")}
      accessibilityRole="button"
      accessibilityLabel="Search groceries"
      className="mx-5 mt-6"
    >
      <View className="h-12 flex-row items-center rounded-2xl border border-border bg-surface px-4">
        <Text className="mr-3 text-lg">🔍</Text>

        <Text className="flex-1 text-sm text-muted">
          Search for groceries...
        </Text>

        <Text className="text-lg">☰</Text>
      </View>
    </Pressable>
  );
}