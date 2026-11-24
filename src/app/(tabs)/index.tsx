
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  featuredProducts,
  homeCategories,
  homeDeals,
} from "@/features/home/data/home.data";

import HomeHeader from "@/features/home/components/HomeHeader";
import HomeSearchBar from "@/features/home/components/HomeSearchBar";
import PromoBanner from "@/features/home/components/PromoBanner";
import CategorySection from "@/features/home/components/CategorySection";
import DealsSection from "@/features/home/components/DealsSection";
import FeaturedProducts from "@/features/home/components/FeatureProducts";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <HomeHeader />
        <HomeSearchBar />
        <PromoBanner />
        <CategorySection categories={homeCategories} />
        <DealsSection deals={homeDeals} />
        <FeaturedProducts products={featuredProducts} />
      </ScrollView>
    </SafeAreaView>
  );
}
