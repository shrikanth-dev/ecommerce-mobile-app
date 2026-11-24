
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { CategorySectionProps } from '../types/home.types';

export default function CategorySection({
  categories,
}: CategorySectionProps) {
  return (
    <View className="mt-7">
      <View className="mb-4 flex-row items-center justify-between px-5">
        <Text className="text-lg font-bold text-foreground">
          Shop by category
        </Text>

        <Pressable>
          <Text className="text-sm font-semibold text-primary">
            See all
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 14,
        }}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            className="w-[76px] items-center"
          >
            <View className="h-[68px] w-[68px] items-center justify-center rounded-2xl bg-white">
              <Text className="text-3xl">{category.icon}</Text>
            </View>

            <Text className="mt-2 text-xs font-medium text-foreground">
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
