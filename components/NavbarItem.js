import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../screens/Home/HomeScreen.styles";

export default function NavbarItem({ item, isActive, onPress, colors }) {
  const activeColor = item.activeColor || colors.primary;

  return (
    <TouchableOpacity
      style={styles.navButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isActive ? item.icon : `${item.icon}-outline`}
        size={22}
        color={isActive ? activeColor : colors.subText}
      />
      <Text
        style={[
          styles.navText,
          { color: isActive ? activeColor : colors.subText },
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}
