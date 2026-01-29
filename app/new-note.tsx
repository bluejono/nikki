import { useTheme } from "@/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewNote() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { isDark, colorScheme } = useTheme();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const isIos = Platform.OS === "ios";
  const contentInputRef = useRef<TextInput>(null);

  // --- Speech Recognition Logic ---

  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => setIsListening(false));
  useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results[0]?.transcript;
    if (transcript) {
      setContent((prev) => prev + (prev.length > 0 ? " " : "") + transcript);
    }
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.error("Speech recognition error:", event.error, event.message);
    setIsListening(false);
    if ((event.error as string) !== "no-match") {
      Alert.alert(t("common.error", "Error"), event.message);
    }
  });

  const handleMicPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (isListening) {
      ExpoSpeechRecognitionModule.stop();
      return;
    }

    // Defensive check for native module (Expo Go or missing build)
    if (!ExpoSpeechRecognitionModule) {
      Alert.alert(
        t("common.error", "Error"),
        t("note_editor.module_missing", "Native module not found. Please ensure you are not using Expo Go and have rebuilt the app.")
      );
      return;
    }

    // Request permissions
    const { granted, canAskAgain } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();

    if (!granted) {
      if (!canAskAgain) {
        Alert.alert(
          t("note_editor.mic_permission_title", "Microphone Permission"),
          t("note_editor.mic_permission_blocked", "Permission is blocked. Please enable it in the system settings."),
          [
            { text: t("common.cancel", "Cancel"), style: "cancel" },
            {
              text: t("common.open_settings", "Open Settings"),
              onPress: () => Linking.openSettings()
            }
          ]
        );
      } else {
        Alert.alert(
          t("note_editor.mic_permission_title", "Microphone Permission"),
          t("note_editor.mic_permission_message", "Please allow microphone access to use transcription.")
        );
      }
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang: i18n.language === "pt" ? "pt-BR" : "en-US",
      interimResults: false,
    });
  };

  // --- End Speech Recognition Logic ---

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(isIos);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const locale = i18n.language === "pt" ? "pt-BR" : "en-US";
    const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    const year = date.getFullYear();

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    if (i18n.language === "pt") {
      return `${capitalize(weekday)}, ${day} de ${capitalize(month)}, ${year}`;
    }
    return `${capitalize(weekday)}, ${day} ${capitalize(month)}, ${year}`;
  };

  const handlePress = (action: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action();
  };

  return (
    <SafeAreaView
      className={`${colorScheme === "dark" ? "dark" : ""} bg-background flex-1`}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        className="flex-1"
      >
        {/* 1️⃣ Top Bar */}
        <View className="flex-row justify-between items-center p-6 pb-0">
          <TouchableOpacity
            onPress={() => handlePress(() => router.back())}
            className="w-12 h-12 rounded-full bg-primary items-center justify-center border border-border/10"
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <View className="flex-1 items-center px-4">
            {isKeyboardVisible && (
              <TouchableOpacity
                className={`w-12 h-12 rounded-full items-center justify-center border border-border/10 ${isListening ? 'bg-red-500 shadow-lg' : 'bg-secondary'}`}
                activeOpacity={0.7}
                onPress={handleMicPress}
              >
                <Ionicons name={isListening ? "stop" : "mic"} size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => handlePress(() => router.back())}
            className="w-12 h-12 rounded-full bg-secondary items-center justify-center border border-border/10"
            activeOpacity={0.7}
          >
            <Ionicons name="checkmark" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* 2️⃣ Note Header */}
          <View className="mt-4">
            <TextInput
              className="text-foreground text-3xl font-bold leading-tight tracking-[-0.8px]"
              placeholder={t("note_editor.title_placeholder")}
              placeholderTextColor={isDark ? "#555" : "#999"}
              multiline
              value={title}
              onChangeText={setTitle}
              scrollEnabled={false}
              style={{ fontFamily: 'Inter_600SemiBold' }}
              onFocus={() => {
                setKeyboardVisible(false);
                setIsListening(false);
                if (ExpoSpeechRecognitionModule) {
                  ExpoSpeechRecognitionModule.stop();
                }
              }}
            />

            <TouchableOpacity
              onPress={() => handlePress(() => setShowDatePicker(true))}
              className={`${isIos ? "mt-2" : "mt-0 px-1"}`}
              activeOpacity={0.6}
            >
              <Text className="text-muted-foreground text-md font-regular opacity-80 tracking-[-0.6px]">
                {formatDate(date)}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={isIos ? "default" : "calendar"}
                onChange={onDateChange}
                themeVariant={isDark ? "dark" : "light"}
              />
            )}
          </View>

          {/* 3️⃣ Note Content Section */}
          <View className="mt-2 pb-32">
            <TextInput
              ref={contentInputRef}
              className="text-foreground text-xl leading-relaxed text-justify tracking-[-0.2px]"
              placeholder={t("note_editor.content_placeholder")}
              placeholderTextColor={isDark ? "#444" : "#ccc"}
              multiline
              value={content}
              onChangeText={setContent}
              scrollEnabled={false}
              style={{ minHeight: 400, textAlignVertical: "top", fontFamily: 'Inter_400Regular' }}
              onFocus={() => setKeyboardVisible(true)}
              onBlur={() => {
                if (!isListening) {
                  // setKeyboardVisible(false);
                }
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
