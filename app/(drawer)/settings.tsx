import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-foreground text-2xl font-bold">Settings</Text>
      <Text className="text-muted-foreground mt-2">Manage your preferences here.</Text>
    </View>
  );
}
