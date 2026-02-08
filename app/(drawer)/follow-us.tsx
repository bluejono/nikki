import { useTheme } from "@/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FollowUs() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(drawer)/(tabs)");
    }
  };

  const SocialItem = ({
    icon,
    label,
    handle,
    isLast = false,
    iconColor = "white"
  }: {
    icon: keyof typeof Ionicons.glyphMap,
    label: string,
    handle: string,
    isLast?: boolean,
    iconColor?: string
  }) => (
    <Pressable
      className={`flex-row items-center px-5 py-5 ${!isLast ? 'border-b border-white/5' : ''}`}
      style={({ pressed }) => ({
        backgroundColor: pressed ? 'rgba(255,255,255,0.02)' : 'transparent'
      })}
    >
      <View className="w-12 h-12 items-center justify-center bg-white/10 rounded-2xl mr-4 border border-white/5">
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-white font-semibold text-[17px] tracking-tight">{label}</Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-white/30 mr-2 text-[15px] font-medium">{handle}</Text>
        <Ionicons name="arrow-forward" size={16} color="rgba(255,255,255,0.2)" />
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-[#071011]">
      <LinearGradient
        colors={['rgba(230, 168, 53, 0.08)', 'transparent', 'transparent']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-6 py-4">
          <Pressable
            onPress={handleBack}
            className="w-12 h-12 items-center justify-center bg-white/5 rounded-full border border-white/10"
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.95 : 1 }],
              opacity: pressed ? 0.8 : 1
            })}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
          <Text className="text-white text-[19px] font-black tracking-tight">{t('follow_us.title')}</Text>
          <View className="w-12" />
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 20 }}
        >
          <View className="items-center">
            <View className="flex-row items-center justify-center">
              <View className="relative shadow-2xl">
                <Image
                  source={{ uri: "https://github.com/iamdevmarcos.png" }}
                  className="w-28 h-28 rounded-full border-[6px] border-[#071011]"
                />
                <View className="absolute inset-0 rounded-full border border-white/10" />
              </View>
              <View className="relative -ml-10 shadow-2xl">
                <Image
                  source={{ uri: "https://github.com/bluejono.png" }}
                  className="w-28 h-28 rounded-full border-[6px] border-[#071011]"
                />
                <View className="absolute inset-0 rounded-full border border-white/10" />
              </View>
            </View>

            <View className="items-center px-4 mt-10">
              <Text className="text-white text-center text-[22px] leading-8 font-semibold tracking-tight">
                {t('follow_us.greeting')} {'\n'}
                <Text className="text-hunyadi-yellow">João and Marcos</Text>
              </Text>
              <Text className="text-white/60 text-center text-[17px] leading-7 mt-4 px-2">
                {t('follow_us.minds_behind')}
              </Text>
              <Text className="text-white/40 text-center text-base mt-6 font-medium">
                {t('follow_us.call_to_action')}
              </Text>
            </View>
          </View>

          <View className="mt-14 gap-y-6 pb-24">
            <View className="bg-white/5 rounded-[32px] overflow-hidden border border-white/10">
              <SocialItem
                icon="logo-linkedin"
                label="LinkedIn"
                handle="marcos-mendes"
                iconColor="#0A66C2"
              />
              <SocialItem
                icon="logo-instagram"
                label="Instagram"
                handle="@iamdevmarcos"
                isLast
                iconColor="white"
              />
            </View>

            <View className="bg-white/5 rounded-[32px] overflow-hidden border border-white/10">
              <SocialItem
                icon="logo-linkedin"
                label="LinkedIn"
                handle="joao-dev"
                iconColor="#0A66C2"
              />
              <SocialItem
                icon="logo-instagram"
                label="Instagram"
                handle="@joao"
                isLast
                iconColor="white"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
