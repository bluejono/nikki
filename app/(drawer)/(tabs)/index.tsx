import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="bg-background"
      edges={['top']}
    >
      <Header />

      <ScrollView
        className="flex-1 px-6 mt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mb-2 flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <Text className="text-xs font-bold uppercase tracking-widest text-[#91A0AA]">
              {formattedDate}
            </Text>
            <TouchableOpacity
              onPress={toggleLanguage}
              className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md"
            >
              <Text className="text-[10px] font-black text-hunyadi-yellow uppercase">
                {i18n.language.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-4">
            <Link href="/(drawer)/follow-us" asChild>
              <TouchableOpacity>
                <Text className="text-xs font-bold text-[#91A0AA] uppercase tracking-widest">
                  Follow Us
                </Text>
              </TouchableOpacity>
            </Link>
            <Link href="/onboarding" asChild>
              <TouchableOpacity>
                <Text className="text-xs font-bold text-hunyadi-yellow uppercase tracking-widest">
                  {t('home.see_onboarding')}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <HomeHero />
      </ScrollView>
    </SafeAreaView >
  );
}
