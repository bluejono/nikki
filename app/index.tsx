import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function Index() {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const getThemeIcon = () => {
    if (theme === "light") return "sunny";
    if (theme === "dark") return "moon";
    return "contrast";
  };

  return (
    <View className="bg-background h-full flex items-center justify-center gap-8">
      <TouchableOpacity
        onPress={toggleTheme}
        className="absolute top-12 right-6 p-3 rounded-full bg-secondary"
      >
        <Ionicons name={getThemeIcon()} size={24} color={isDark ? "white" : "black"} />
      </TouchableOpacity>

      <View>
        <Text className="text-primary text-center text-4xl font-black mb-2">
          Nikki
        </Text>
        <Text className="text-foreground text-center text-3xl font-bold">
          Aoba Inter Bold
        </Text>
        <Text className="text-muted-foreground text-center text-xl font-semibold">
          Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </Text>
        <Text className="text-muted-foreground text-center text-lg italic mt-4">
          Inter Regular (Default)
        </Text>
      </View>

      <View className="flex-row gap-4">
        <Link href="/login" asChild>
          <TouchableOpacity className="bg-primary px-8 py-4 rounded-xl shadow-lg">
            <Text className="text-primary-foreground font-bold text-lg">Go to Login</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="p-6 bg-secondary rounded-2xl w-5/6">
        <Text className="text-foreground font-semibold text-center">
          This container uses the "secondary" theme color.
        </Text>
      </View>
    </View>
  );
}
