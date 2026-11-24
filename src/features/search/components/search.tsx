
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import ProductCard from "@/features/home/components/ProductCard";
import {
  featuredProducts,
  homeCategories,
} from "@/features/home/data/home.data";

const categories = [
  { id: "all", name: "All", icon: "🛍️" },
  ...homeCategories,
];

export default function SearchScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return featuredProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
          flexGrow: 1,
        }}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View className="mb-5 flex-row items-center">
              <Pressable
                onPress={() => router.back()}
                className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white"
                accessibilityRole="button"
                accessibilityLabel="Go back to Home"
              >
                <Text className="text-2xl text-foreground">‹</Text>
              </Pressable>

              <View>
                <Text className="text-2xl font-extrabold text-foreground">
                  Search
                </Text>
                <Text className="mt-1 text-xs text-muted">
                  Find your favourite groceries
                </Text>
              </View>
            </View>

            {/* Search Input */}
            <View className="mb-6 flex-row items-center rounded-2xl border border-border bg-white px-4">
              <Text className="mr-3 text-lg">🔍</Text>

              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search fruits, vegetables..."
                placeholderTextColor="#9CA3AF"
                className="h-12 flex-1 text-sm text-foreground"
                autoFocus
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                accessibilityLabel="Search products"
              />

              {searchQuery.length > 0 && (
                <Pressable
                  onPress={() => setSearchQuery("")}
                  accessibilityRole="button"
                  accessibilityLabel="Clear search"
                >
                  <Text className="ml-2 text-lg text-muted">✕</Text>
                </Pressable>
              )}
            </View>

            {/* Category Filters */}
            <View className="mb-6">
              <Text className="mb-3 text-base font-bold text-foreground">
                Browse Categories
              </Text>

              <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => {
                  const isSelected = selectedCategory === item.name;

                  return (
                    <Pressable
                      onPress={() => setSelectedCategory(item.name)}
                      className={`flex-row items-center rounded-full border px-4 py-2.5 ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-border bg-white"
                      }`}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <Text className="mr-2">{item.icon}</Text>

                      <Text
                        className={`text-sm font-semibold ${
                          isSelected ? "text-surface" : "text-foreground"
                        }`}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            </View>

            {/* Results Header */}
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-base font-bold text-foreground">
                {searchQuery.trim() ? "Search Results" : "All Products"}
              </Text>

              <Text className="text-xs text-muted">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16">
            <Text className="text-5xl">🔍</Text>

            <Text className="mt-4 text-lg font-bold text-foreground">
              No products found
            </Text>

            <Text className="mt-2 text-center text-sm text-muted">
              We couldn't find products matching your search or category.
              Try changing your filters.
            </Text>

            <Pressable
              onPress={clearFilters}
              className="mt-5 rounded-xl bg-primary px-5 py-3"
            >
              <Text className="font-bold text-surface">
                Clear Filters
              </Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}
