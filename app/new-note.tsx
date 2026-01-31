import { useTheme } from "@/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Animated,
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
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // A ref to keep track of the latest interim transcript for the 'end' event
  const interimRef = useRef("");
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const isIos = Platform.OS === "ios";
  const contentInputRef = useRef<TextInput>(null);

  // --- Speech Recognition Events ---

  useSpeechRecognitionEvent("start", () => {
    setIsListening(true);
    setInterimTranscript("");
    interimRef.current = "";
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  });

  useSpeechRecognitionEvent("end", () => {
    // CRITICAL FIX: If there's pending text in the interim buffer when it stops,
    // move it to the main content before clearing.
    if (interimRef.current) {
      setContent((prev) => {
        const space = prev.length > 0 && !prev.endsWith(" ") ? " " : "";
        return prev + space + interimRef.current;
      });
    }

    setIsListening(false);
    setInterimTranscript("");
    interimRef.current = "";
    pulseAnim.setValue(1);
    pulseAnim.stopAnimation();
  });

  useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results[0]?.transcript;
    const isFinal = event.results[0]?.isFinal;

    if (isFinal) {
      setContent((prev) => {
        const space = prev.length > 0 && !prev.endsWith(" ") ? " " : "";
        return prev + space + transcript;
      });
      setInterimTranscript("");
      interimRef.current = "";
    } else {
      setInterimTranscript(transcript);
      interimRef.current = transcript; // Sync ref
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    const errorCode = String(event.error);
    if (errorCode !== "no-match" && errorCode !== "canceled") {
      Alert.alert(t("common.error", "Error"), event.message);
    }
    setIsListening(false);
    setInterimTranscript("");
    interimRef.current = "";
  });

  const handleMicPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (isListening) {
      ExpoSpeechRecognitionModule.stop();
      return;
    }

    if (!ExpoSpeechRecognitionModule) {
      Alert.alert(t("common.error", "Error"), "Native module not found.");
      return;
    }

    try {
      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(t("note_editor.mic_permission_title"), t("note_editor.mic_permission_message"));
        return;
      }

      const recognitionLang = i18n.language === "pt" ? "pt-BR" : "en-US";
      ExpoSpeechRecognitionModule.start({
        lang: recognitionLang,
        interimResults: true,
        continuous: true,
        addsPunctuation: true,
      });
    } catch (err) {
      console.error(err);
      setIsListening(false);
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

  return (
    <SafeAreaView className="bg-background flex-1" edges={["top"]}>
      <KeyboardAvoidingView behavior={isIos ? "padding" : "height"} className="flex-1">
        {/* Top Bar */}
        <View className="flex-row justify-between items-center p-6 pb-0">
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
            className="w-12 h-12 rounded-full bg-primary items-center justify-center border border-border/10"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <View className="flex-1 items-center px-4">
            {(isKeyboardVisible || isListening) && (
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity
                  onPress={handleMicPress}
                  activeOpacity={0.7}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isListening ? '#ef4444' : '#27272a',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.1)'
                  }}
                >
                  <Ionicons name={isListening ? "stop" : "mic"} size={24} color="white" />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
            className="w-12 h-12 rounded-full bg-secondary items-center justify-center border border-border/10"
          >
            <Ionicons name="checkmark" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Note Header */}
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
                if (isListening && ExpoSpeechRecognitionModule) ExpoSpeechRecognitionModule.stop();
              }}
            />

            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setShowDatePicker(true);
              }}
              className={`${isIos ? "mt-2" : "mt-0 px-1"}`}
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
                onChange={(e, d) => {
                  setShowDatePicker(isIos);
                  if (d) setDate(d);
                }}
                themeVariant={isDark ? "dark" : "light"}
              />
            )}
          </View>

          {/* Note Content Section */}
          <View className="mt-2 pb-32">
            <TextInput
              ref={contentInputRef}
              className="text-foreground text-xl leading-relaxed text-justify tracking-[-0.3px]"
              placeholder={t("note_editor.content_placeholder")}
              placeholderTextColor={isDark ? "#444" : "#ccc"}
              multiline
              // Display stable content + what is currently being spoken
              value={content + (interimTranscript ? (content.length > 0 && !content.endsWith(" ") ? " " : "") + interimTranscript : "")}
              onChangeText={setContent}
              scrollEnabled={false}
              style={{ minHeight: 400, textAlignVertical: "top", fontFamily: 'Inter_400Regular' }}
              onFocus={() => setKeyboardVisible(true)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
