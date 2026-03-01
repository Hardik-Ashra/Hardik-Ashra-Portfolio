import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const THEMES = [
  { id: "neobrutalism", label: "NeoBrutalism", color: "#ff6b35" },
  { id: "skeuomorphism", label: "Skeuomorphism", color: "#3478f6" },
  { id: "glassmorphism", label: "Glassmorphism", color: "#6366f1" },
  { id: "liquidglass", label: "Liquid Glass", color: "#0ea5e9" },
  { id: "minimalism", label: "Minimalism", color: "#111111" },
];

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "neobrutalism";
    }
    return "neobrutalism";
  });

  const [mode, setModeState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-mode") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("portfolio-theme", theme);
    localStorage.setItem("portfolio-mode", mode);
  }, [theme, mode]);

  const setTheme = (name) => setThemeState(name);
  const toggleMode = () =>
    setModeState((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{ theme, mode, setTheme, toggleMode, THEMES }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
