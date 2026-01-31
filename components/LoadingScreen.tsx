import { useTheme } from "@/theme/ThemeContext";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingScreen = () => {
  const { colors } = useTheme();

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: colors.background }}
    >
      <View className="mb-8 items-center justify-center">
        <View className="w-20 h-20 rounded-3xl bg-primary items-center justify-center shadow-xl border border-border/10">
          <Text className="text-primary-foreground text-2xl font-black">N</Text>
        </View>
      </View>

      <ActivityIndicator size="small" color={colors.foreground} />

      <Text
        className="mt-6 text-foreground text-sm font-medium tracking-[2px] uppercase opacity-40"
      >
        Carregando
      </Text>
    </View>
  );
};

export default LoadingScreen;
