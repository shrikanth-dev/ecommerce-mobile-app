import { View, Text } from 'react-native';

export default function AppTabs() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
      <View className="w-full rounded-2xl bg-white p-6 shadow-md">
        <Text className="text-2xl font-bold text-primary">
          One Stop Shop
        </Text>

        <Text className="mt-2 text-base text-muted">
          NativeWind is working!
        </Text>

        <View className="mt-6 rounded-xl bg-primary px-5 py-3">
          <Text className="text-center font-semibold text-white">
            Test Successful
          </Text>
        </View>
      </View>
    </View>
  );
}