
import { Pressable, Text, View } from 'react-native';
import type { FeaturedProductsProps } from '../types/home.types';

import ProductCard from './ProductCard';

export default function FeaturedProducts({
  products,
}: FeaturedProductsProps) {
  return (
    <View className="mt-8 px-5">
      <View className="mb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold text-foreground">
            Popular products
          </Text>

          <Text className="mt-1 text-xs text-muted">
            Picks you'll love
          </Text>
        </View>

        <Pressable>
          <Text className="text-sm font-semibold text-primary">
            View all
          </Text>
        </Pressable>
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-4">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </View>
  );
}
