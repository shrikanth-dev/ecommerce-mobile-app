
import { FlatList, Text, View } from "react-native";

import ProductCard from "@/features/home/components/ProductCard";
import { useWishlistStore } from "@/store/wishlist.store";

export default function WishlistScreen() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <View className="flex-1 bg-background px-4 pt-6">
      {/* Header */}
      <View className="mt-6 mb-6">
        <Text className="text-2xl font-extrabold text-foreground">
          My Wishlist
        </Text>

        <Text className="mt-1 text-sm text-muted">
          {wishlist.length === 0
            ? "Your favourite products will appear here"
            : `${wishlist.length} saved ${
                wishlist.length === 1 ? "product" : "products"
              }`}
        </Text>
      </View>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-5xl">♡</Text>

          <Text className="mt-4 text-lg font-bold text-foreground">
            Your wishlist is empty
          </Text>

          <Text className="mt-2 text-center text-sm text-muted">
            Explore our products and tap the heart icon
            to save your favourites.
          </Text>
        </View>
      ) : (
        /* Wishlist Products */
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          renderItem={({ item }) => (
            <ProductCard product={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}
