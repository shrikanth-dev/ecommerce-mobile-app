
import { Pressable, ScrollView, Text, View } from 'react-native';

import DealCard from './DealCard';
import type { DealsSectionProps } from '../types/home.types';



export default function DealsSection({ deals }: DealsSectionProps) {
  return (
    <View className="mt-8">
      {/* Section Header */}
      <View className="mb-4 flex-row items-center justify-between px-5">
        <View>
          <Text className="text-lg font-bold text-foreground">
            Deals & Offers
          </Text>
          <Text className="mt-1 text-xs text-muted">
            Don't miss today's best deals
          </Text>
        </View>

        <Pressable accessibilityRole="button">
          <Text className="text-sm font-semibold text-primary">
            See all
          </Text>
        </Pressable>
      </View>

      {/* Horizontal Deals List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 12,
        }}
      >
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </ScrollView>
    </View>
  );
}
