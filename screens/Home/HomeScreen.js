import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  BackHandler,
  ToastAndroid,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { styles } from "./HomeScreen.styles";

import SettingsScreen from "../Settings/SettingsScreen";
import ProfileScreen from "../Profile/ProfileScreen";
import ShopScreen from "../Shop/ShopScreen";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";

export default function HomeScreen() {
  const { theme, colors } = useTheme();
  const [currentTab, setCurrentTab] = useState("home");
  const [search, setSearch] = useState("");

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigationHistory = useRef(["home"]);
  const lastBackButtonPress = useRef(0);

  useEffect(() => {
    fetchUserRole();
  }, []);

  async function fetchUserRole() {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (data) {
          setRole(data.role);
        } else {
          setRole("customer");
        }
      }
    } catch (error) {
      console.log("Rol yükleme hatası:", error.message);
      setRole("customer");
    } finally {
      setLoading(false);
    }
  }

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

  const handleBackNavigation = () => {
    handleTabChange("home");
  };

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <>
            <View style={styles.headerSection}>
              <View
                style={[
                  styles.searchContainer,
                  {
                    backgroundColor:
                      theme === "light" ? "#F0F0F0" : colors.card,
                  },
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
          </>
        );

      case "shop":
        return <ShopScreen />;

      case "profile":
        return <ProfileScreen />;

      case "settings":
        return <SettingsScreen onBack={handleBackNavigation} />;

      case "analytics":
        return (
          <View style={styles.mainContent}>
            <Text style={{ color: colors.text }}>
              Analiz Sayfası Yakında...
            </Text>
          </View>
        );

      case "calendar":
        return (
          <View style={styles.mainContent}>
            <Text style={{ color: colors.text }}>
              Takvim Sayfası Yakında...
            </Text>
          </View>
        );

      case "favorites":
      case "map":
        return (
          <View style={styles.mainContent}>
            <Text style={{ color: colors.text }}>
              {currentTab.toUpperCase()} Sayfası Yakında...
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={{ flex: 1 }}>{renderContent()}</View>

      <BottomNavbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        colors={colors}
        role={role}
      />
    </SafeAreaView>
  );
}
