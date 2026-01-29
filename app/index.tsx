import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="bg-black h-full flex items-center justify-center gap-8">
      <View>
        <Text className="text-yellow-500 text-center text-3xl font-bold">Aoba Inter Bold</Text>
        <Text className="text-white text-center text-xl font-semibold">Inter SemiBold</Text>
        <Text className="text-gray-400 text-center text-lg">Inter Regular (Default)</Text>
      </View>

      <Link href="/login" asChild>
        <TouchableOpacity className="bg-white px-8 py-3 rounded-sm">
          <Text className="text-black font-bold">Go to Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
