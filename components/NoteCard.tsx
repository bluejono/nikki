import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DECORATION_LARGE_SIZE = 192;
const DECORATION_SMALL_SIZE = 96;
const NUMBER_OF_LINES = 2;

interface NoteCardProps {
  title: string;
  description: string;
  createdAt: string;
}

const NoteCard = ({ title, description, createdAt }: NoteCardProps) => {
  return (
    <View className="rounded-3xl overflow-hidden bg-hunyadi-yellow p-6 shadow-xl shadow-hunyadi-yellow/20">
      <View className="z-10 gap-2">
        <View className="flex-row justify-between items-start">
          <Text className="flex-1 text-3xl font-black leading-tight tracking-tighter text-[#071011]">
            {title}
          </Text>
          <Text className="text-[#071011]/50 font-bold text-xs mt-2">
            {createdAt}
          </Text>
        </View>

        <Text
          className="text-[#071011]/70 font-semibold text-base leading-snug"
          numberOfLines={NUMBER_OF_LINES}
        >
          {description}
        </Text>
      </View>

      <View
        style={[styles.decorationLarge, { backgroundColor: "rgba(255,255,255,0.2)" }]}
        className="absolute -right-8 -bottom-8 rounded-full"
      />
      <View
        style={[styles.decorationSmall, { backgroundColor: "rgba(255,255,255,0.1)" }]}
        className="absolute right-4 top-4 rounded-full"
      />
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  decorationLarge: {
    width: DECORATION_LARGE_SIZE,
    height: DECORATION_LARGE_SIZE,
  },
  decorationSmall: {
    width: DECORATION_SMALL_SIZE,
    height: DECORATION_SMALL_SIZE,
  },
});
