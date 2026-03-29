import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeScreen.styles";

import SettingsScreen from "../Settings/SettingsScreen";
import { useTheme } from "../../context/ThemeContext";

export default function HomeScreen() {
  const { theme, colors } = useTheme();
  const [currentTab, setCurrentTab] = useState("home");
  const [search, setSearch] = useState("");

  if (currentTab === "settings") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <SettingsScreen onBack={() => setCurrentTab("home")} />
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

      <View
        style={[
          styles.bottomNavbar,
          { backgroundColor: colors.card, borderTopColor: colors.border },
        ]}
      >
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentTab("map")}
        >
          <Ionicons
            name={currentTab === "map" ? "map" : "map-outline"}
            size={24}
            color={currentTab === "map" ? colors.primary : colors.subText}
          />
          <Text
            style={{
              fontSize: 10,
              color: currentTab === "map" ? colors.primary : colors.subText,
            }}
          >
            Harita
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentTab("home")}
        >
          <Ionicons
            name={currentTab === "home" ? "home" : "home-outline"}
            size={24}
            color={currentTab === "home" ? colors.primary : colors.subText}
          />
          <Text
            style={{
              fontSize: 10,
              color: currentTab === "home" ? colors.primary : colors.subText,
            }}
          >
            Ana Sayfa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentTab("profile")}
        >
          <Ionicons
            name={currentTab === "profile" ? "person" : "person-outline"}
            size={24}
            color={currentTab === "profile" ? colors.primary : colors.subText}
          />
          <Text
            style={{
              fontSize: 10,
              color: currentTab === "profile" ? colors.primary : colors.subText,
            }}
          >
            Profil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentTab("settings")}
        >
          <Ionicons
            name={currentTab === "settings" ? "settings" : "settings-outline"}
            size={24}
            color={currentTab === "settings" ? colors.primary : colors.subText}
          />
          <Text
            style={{
              fontSize: 10,
              color:
                currentTab === "settings" ? colors.primary : colors.subText,
            }}
          >
            Ayarlar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
