import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import { styles } from "./ThemeScreen.styles";

import SettingsHeader from "../SettingsHeader";

export default function ThemeScreen({ onBack }) {
  const { theme, toggleTheme, colors } = useTheme();

  const ThemeOption = ({ label, value, icon }) => (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: colors.border }]}
      onPress={() => {
        if (theme !== value) toggleTheme();
      }}
    >
      <Ionicons name={icon} size={22} color={colors.text} />
      <Text style={[styles.rowText, { color: colors.text }]}>{label}</Text>

      <View
        style={[
          styles.radioCircle,
          { borderColor: theme === value ? colors.primary : colors.border },
        ]}
      >
        {theme === value && (
          <View
            style={[styles.selectedRb, { backgroundColor: colors.primary }]}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, flex: 1 },
      ]}
    >
      <SettingsHeader title="Görünüm" onBack={onBack} />

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.subText }]}>
          TEMA SEÇİN
        </Text>

        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <ThemeOption
            label="Aydınlık Mod"
            value="light"
            icon="sunny-outline"
          />
          <ThemeOption label="Karanlık Mod" value="dark" icon="moon-outline" />
        </View>

        <Text style={[styles.footerText, { color: colors.subText }]}>
          Tema değişikliği otomatik olarak kaydedilir ve tüm cihazlarınızda
          senkronize edilir.
        </Text>
      </View>
    </View>
  );
}
