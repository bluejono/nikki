import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Image, Pressable, Text, View } from "react-native";

const Header = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="px-5 pt-4 pb-2 bg-background w-full">
      <View className="relative h-11 justify-center">

        <Pressable className="absolute left-0">
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            className="w-11 h-11 rounded-full"
          />
        </Pressable>
      
        <Text className="text-3xl font-semibold text-foreground text-center">
          My Notes
        </Text>

        <Pressable className="absolute flex items-center right-0 w-9 h-9 rounded-full bg-foreground justify-center">
          <Ionicons name="ellipsis-horizontal" size={24} color={colorScheme === "dark" ? "black" : "white"} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
