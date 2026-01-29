import { useTheme } from "@/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { theme, setTheme, isDark, colorScheme } = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(nextLang);
  };

  const getThemeIcon = () => {
    if (theme === "light") return "sunny";
    if (theme === "dark") return "moon";
    return "contrast";
  };

  return (
    <View
      style={{ flex: 1 }}
      className={`${colorScheme === "dark" ? "dark" : ""} bg-background items-center justify-center gap-8`}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Top Controls */}
      <View className="absolute top-12 right-6 flex-row gap-4">
        <TouchableOpacity
          onPress={toggleLanguage}
          className="p-3 rounded-full bg-secondary shadow-sm"
          activeOpacity={0.7}
        >
          <Text className="text-secondary-foreground font-bold text-xs">
            {i18n.language.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleTheme}
          className="p-3 rounded-full bg-secondary shadow-sm"
          activeOpacity={0.7}
        >
          <Ionicons name={getThemeIcon()} size={20} color={isDark ? "white" : "black"} />
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <Text className="text-primary text-center text-5xl font-black mb-2 tracking-tighter">
          {t("home.title")}
        </Text>
        <Text className="text-foreground text-center text-2xl font-bold">
          {t("home.subtitle")}
        </Text>
        <View className="mt-4 bg-secondary px-4 py-1 rounded-full">
          <Text className="text-secondary-foreground text-center text-sm font-medium">
            {t("home.theme_label", {
              theme: t(`home.themes.${theme}`)
            })}
          </Text>
        </View>
        <Text className="text-muted-foreground text-center text-sm italic mt-6 opacity-60">
          {t("home.default_font")}
        </Text>
      </View>

      <View className="gap-4 w-full px-10">
        <TouchableOpacity
          className="bg-primary py-4 rounded-2xl shadow-xl border border-border items-center"
          onPress={() => router.push("/login")}
        >
          <Text className="text-primary-foreground font-bold text-lg">
            {t("home.go_to_login")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-secondary py-4 rounded-2xl shadow-xl border border-border/20 items-center"
          onPress={() => router.push("/new-note")}
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name="add-circle-outline" size={24} color={isDark ? "white" : "black"} />
            <Text className="text-secondary-foreground font-bold text-lg">
              {t("home.new_note")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="p-6 bg-secondary/50 rounded-3xl w-5/6 mt-8 border border-border/20">
        <Text className="text-secondary-foreground font-medium text-center leading-relaxed">
          {t("home.container_text")}
        </Text>
      </View>
    </View>
  );
}
