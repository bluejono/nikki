import * as Haptics from "expo-haptics";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Animated } from "react-native";

interface UseNoteSpeechRecognitionProps {
  onFinalResult: (transcript: string) => void;
}

const PULSE_SCALE_MAX = 1.15;
const PULSE_SCALE_MIN = 1;
const PULSE_DURATION = 600;

export function useNoteSpeechRecognition({ onFinalResult }: UseNoteSpeechRecognitionProps) {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const interimRef = useRef("");
  const pulseAnim = useRef(new Animated.Value(PULSE_SCALE_MIN)).current;

  useSpeechRecognitionEvent("start", () => {
    setIsListening(true);
    setInterimTranscript("");
    interimRef.current = "";
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: PULSE_SCALE_MAX, duration: PULSE_DURATION, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: PULSE_SCALE_MIN, duration: PULSE_DURATION, useNativeDriver: true }),
      ])
    ).start();
  });

  useSpeechRecognitionEvent("end", () => {
    if (interimRef.current) {
      onFinalResult(interimRef.current);
    }

    setIsListening(false);
    setInterimTranscript("");
    interimRef.current = "";
    pulseAnim.setValue(1);
    pulseAnim.stopAnimation();
  });

  useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results[0]?.transcript;
    const isFinal = event.isFinal;

    if (isFinal) {
      onFinalResult(transcript);
      setInterimTranscript("");
      interimRef.current = "";
    } else {
      setInterimTranscript(transcript);
      interimRef.current = transcript;
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

  const stopListening = () => {
    if (isListening) {
      ExpoSpeechRecognitionModule.stop();
    }
  };

  return {
    isListening,
    interimTranscript,
    pulseAnim,
    handleMicPress,
    stopListening
  };
}
