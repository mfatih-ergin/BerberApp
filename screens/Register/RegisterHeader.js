import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/RegisterScreen.styles";

export default function RegisterHeader({ onBack, title }) {
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={onBack} style={styles.headerBackButton}>
        <Ionicons name="chevron-back" size={24} color="#346739" />
        <Text style={styles.backButtonText}></Text>
      </TouchableOpacity>
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </View>
  );
}
