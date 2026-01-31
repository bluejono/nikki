export type ColorTheme = Record<
  | "background"
  | "foreground"
  | "primary"
  | "primaryForeground"
  | "secondary"
  | "secondaryForeground"
  | "muted"
  | "mutedForeground"
  | "accent"
  | "accentForeground"
  | "border"
  | "input"
  | "ring",
  string
>;

export const colors: Record<"light" | "dark", ColorTheme> = {
  light: {
    background: "#f5f5f5",
    foreground: "#000000",
    primary: "#ffffff",
    primaryForeground: "#000000",
    secondary: "#000000",
    secondaryForeground: "#ffffff",
    muted: "#e5e5e5",
    mutedForeground: "#555555",
    accent: "#e5e5e5",
    accentForeground: "#000000",
    border: "#cccccc",
    input: "#cccccc",
    ring: "#000000",
  },
  dark: {
    background: "#000000",
    foreground: "#ffffff",
    primary: "#ffffff",
    primaryForeground: "#000000",
    secondary: "#000000",
    secondaryForeground: "#ffffff",
    muted: "#262626",
    mutedForeground: "#a3a3a3",
    accent: "#262626",
    accentForeground: "#ffffff",
    border: "#333333",
    input: "#333333",
    ring: "#ffffff",
  },
};
