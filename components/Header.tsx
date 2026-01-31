import { useTheme } from "@/theme/ThemeContext";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { Image, Pressable, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const profileImageUrl = user?.imageUrl || "https://avatars.githubusercontent.com/u/92524722";

  return (
    <View className="p-6 w-full">
      <View className="relative h-11 justify-center">
        <Image
          source={{ uri: profileImageUrl }}
          className="w-14 h-14 rounded-full border-[1px] border-zinc-400"
        />

        <Pressable
          className="absolute flex items-center right-0 w-14 h-14 rounded-full bg-primary justify-center"
          onPress={openDrawer}
        >
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.foreground} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
