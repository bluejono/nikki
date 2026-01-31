import { Text, View } from "react-native";

export default function FavoritesScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-foreground text-2xl font-bold">Favorites</Text>
      <Text className="text-muted-foreground mt-2">Your favorite notes will appear here.</Text>
    </View>
  );
}
