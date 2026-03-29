import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { supabase } from "../lib/supabase";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("theme_preference")
          .eq("id", user.id)
          .single();

        if (data?.theme_preference) {
          setTheme(data.theme_preference);
        } else {
          setTheme(deviceTheme || "light");
        }
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ theme_preference: newTheme })
        .eq("id", user.id);
    }
  };

  const colors = {
    background: theme === "light" ? "#F5F5F5" : "#121212",
    card: theme === "light" ? "#FFFFFF" : "#1E1E1E",
    text: theme === "light" ? "#333333" : "#FFFFFF",
    subText: theme === "light" ? "#666666" : "#AAAAAA",
    primary: theme === "light" ? "#007AFF" : "#0A84FF",
    border: theme === "light" ? "#DDDDDD" : "#333333",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
