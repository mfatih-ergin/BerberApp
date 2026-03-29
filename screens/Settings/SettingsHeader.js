import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsHeader({ title, onBack }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
      ]}
    >
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color={colors.primary} />
      </TouchableOpacity>

      <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text>

      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
    height: hp("7%"),
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
  },
  backButton: {
    width: 40,
    alignItems: "flex-start",
  },
  placeholder: {
    width: 40,
  },
});
