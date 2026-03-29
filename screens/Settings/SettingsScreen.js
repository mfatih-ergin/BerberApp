import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./SettingsScreen.styles";
import { useTheme } from "../../context/ThemeContext";

import ThemeScreen from "./Theme/ThemeScreen";
import AccountScreen from "./Account/AccountScreen";
import SettingsHeader from "./SettingsHeader";

export default function SettingsScreen({ onBack }) {
  const [currentSubScreen, setCurrentSubScreen] = useState(null);
  const { colors } = useTheme();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Hata", error.message);
  };

  if (currentSubScreen === "theme") {
    return <ThemeScreen onBack={() => setCurrentSubScreen(null)} />;
  }

  if (currentSubScreen === "account") {
    return <AccountScreen onBack={() => setCurrentSubScreen(null)} />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, flex: 1 },
      ]}
    >
      <SettingsHeader title="Ayarlar" onBack={onBack} />

      <View style={styles.content}>
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={[styles.row, { borderBottomColor: colors.border }]}
            onPress={() => setCurrentSubScreen("account")}
          >
            <Ionicons
              name="person-circle-outline"
              size={22}
              color={colors.text}
            />
            <Text style={[styles.rowText, { color: colors.text }]}>
              Hesap Ayarları
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.row, { borderBottomColor: colors.border }]}
            onPress={() => setCurrentSubScreen("theme")}
          >
            <Ionicons
              name="color-palette-outline"
              size={22}
              color={colors.text}
            />
            <Text style={[styles.rowText, { color: colors.text }]}>
              Tema Ayarları
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.row, { borderBottomWidth: 0 }]}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
            <Text style={[styles.rowText, styles.logoutText]}>
              Oturumu Kapat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
