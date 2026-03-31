import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  BackHandler,
  ToastAndroid,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeScreen.styles";

import SettingsScreen from "../Settings/SettingsScreen";
import { useTheme } from "../../context/ThemeContext";
import BottomNavbar from "../../components/BottomNavbar";

export default function HomeScreen() {
  const { theme, colors } = useTheme();
  const [currentTab, setCurrentTab] = useState("home");
  const [search, setSearch] = useState("");

  const navigationHistory = useRef(["home"]);
  const lastBackButtonPress = useRef(0);

  useEffect(() => {
    const backAction = () => {
      if (currentTab !== "home") {
        navigationHistory.current.pop();
        const previousTab =
          navigationHistory.current[navigationHistory.current.length - 1] ||
          "home";
        setCurrentTab(previousTab);
        return true;
      }
      const now = Date.now();
      if (
        lastBackButtonPress.current &&
        now - lastBackButtonPress.current < 2000
      ) {
        BackHandler.exitApp();
      } else {
        lastBackButtonPress.current = now;
        if (Platform.OS === "android") {
          ToastAndroid.show(
            "Çıkmak için bir kez daha basın",
            ToastAndroid.SHORT,
          );
        }
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [currentTab]);

  const handleTabChange = (tab) => {
    if (currentTab !== tab) {
      if (tab === "home") {
        navigationHistory.current = ["home"];
      } else {
        navigationHistory.current.push(tab);
      }
      setCurrentTab(tab);
    }
  };

  const handleBackFromSettings = () => {
    navigationHistory.current.pop();
    const prev =
      navigationHistory.current[navigationHistory.current.length - 1] || "home";
    setCurrentTab(prev);
  };

  if (currentTab === "settings") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <SettingsScreen onBack={handleBackFromSettings} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.headerSection}>
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme === "light" ? "#F0F0F0" : colors.card },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.subText} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Berber veya hizmet ara..."
            placeholderTextColor={colors.subText}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={styles.mainContent}>
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Hoş Geldiniz! 🎉
        </Text>
        <Text style={[styles.subText, { color: colors.subText }]}>
          Size en yakın berberleri bulup randevu alabilirsiniz.
        </Text>
      </View>

      <BottomNavbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        colors={colors}
      />
    </SafeAreaView>
  );
}
