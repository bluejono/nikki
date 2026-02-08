import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HERO_IMAGE_HEIGHT = 320;
const AMBIENT_LIGHT_SIZE = 500;
const BOTTOM_INDICATOR_WIDTH = 128;

const ONBOARDING_DATA = [
    { key: 'step1', image: require('../assets/images/login/bg.png') },
    { key: 'step2', image: require('../assets/images/login/bg.png') },
    { key: 'step3', image: require('../assets/images/login/bg.png') },
];

const OnBoarding = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        const isLastStep = currentStep === ONBOARDING_DATA.length - 1;
        if (!isLastStep) {
            setCurrentStep(prev => prev + 1);
        } else {
            router.replace("/login");
        }
    };

    const handleClose = () => {
        router.replace("/(drawer)/(tabs)");
    };

    const data = ONBOARDING_DATA[currentStep];

    return (
        <View className="flex-1 bg-black">
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.18)', 'rgba(230, 168, 53, 0.15)', '#000000', '#000000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.6, y: 0.6 }}
                style={StyleSheet.absoluteFill}
            />

            <View
                className="absolute top-1/3 left-1/2 rounded-full"
                style={{
                    width: AMBIENT_LIGHT_SIZE,
                    height: AMBIENT_LIGHT_SIZE,
                    backgroundColor: 'rgba(230, 168, 53, 0.05)',
                    opacity: 0.5,
                    transform: [{ translateX: -(AMBIENT_LIGHT_SIZE / 2) }, { translateY: -(AMBIENT_LIGHT_SIZE / 2) }]
                }}
            />

            <SafeAreaView className="flex-1">
                <View className="flex-row items-center justify-between p-6 pt-4">
                    <Pressable onPress={handleClose}>
                        <Ionicons name="close" size={24} color="rgba(255,255,255,0.4)" />
                    </Pressable>
                    <View className="flex-row gap-1.5">
                        {ONBOARDING_DATA.map((_, index) => (
                            <View
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full ${currentStep === index ? 'bg-hunyadi-yellow' : 'bg-white/10'}`}
                            />
                        ))}
                    </View>
                </View>

                <View className="flex-1 justify-center items-center px-10">
                    <View className="w-full relative justify-center items-center" style={{ height: HERO_IMAGE_HEIGHT }}>
                        <Image
                            source={data.image}
                            className="w-full h-full grayscale"
                            style={{ opacity: 0.8 }}
                            resizeMode="contain"
                        />
                    </View>

                    <View className="items-center mt-16">
                        <View className="items-center mb-6">
                            <Text className="text-5xl text-white/90 font-thin tracking-[-1.6px] leading-[1.2] text-center mb-1">
                                {t(`onboarding.${data.key}.title`)}
                            </Text>
                            <Text className="text-5xl text-hunyadi-yellow font-bold tracking-[-1.2px] text-center leading-[1.2]">
                                {t(`onboarding.${data.key}.accent`)}
                            </Text>
                        </View>
                        <Text className="text-cadet-gray text-lg text-center leading-7 max-w-xs">
                            {t(`onboarding.${data.key}.description`)}
                        </Text>
                    </View>
                </View>

                <View className="p-8 pb-14">
                    <Pressable
                        onPress={handleNext}
                        className="w-full bg-hunyadi-yellow py-5 rounded-2xl flex-row items-center justify-center gap-2 shadow-xl"
                        style={({ pressed }) => ({
                            transform: [{ scale: pressed ? 0.98 : 1 }],
                            shadowColor: '#e6a835',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.25,
                            shadowRadius: 30,
                            elevation: 8
                        })}
                    >
                        <Text className="text-rich-black font-black text-xl">
                            {t('onboarding.next')}
                        </Text>
                        <Ionicons name="arrow-forward" size={22} color="#0c0c0c" strokeWidth={4} />
                    </Pressable>
                </View>
            </SafeAreaView>

            <View
                className="absolute bottom-4 left-1/2 bg-white/10 rounded-full h-1"
                style={{ width: BOTTOM_INDICATOR_WIDTH, transform: [{ translateX: -(BOTTOM_INDICATOR_WIDTH / 2) }] }}
            />
        </View>
    );
};

export default OnBoarding;