import { useColorScheme } from "nativewind";
import { createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ColorTheme, colors } from "./colors";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  colorScheme: "light" | "dark";
  colors: ColorTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    if (theme === "system") {
      setColorScheme("system");
    } else {
      setColorScheme(theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const activeColorScheme = colorScheme === "dark" ? "dark" : "light";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark: activeColorScheme === "dark",
        colorScheme: activeColorScheme,
        colors: colors[activeColorScheme],
      }}
    >
      <View style={{ flex: 1 }} className={activeColorScheme === "dark" ? "dark" : ""}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
