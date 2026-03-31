import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../screens/Home/HomeScreen.styles";

export default function BottomNavbar({ currentTab, setCurrentTab, colors }) {
  return (
    <View
      style={[
        styles.bottomNavbar,
        { backgroundColor: colors.card, borderTopColor: colors.border },
      ]}
    >
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setCurrentTab("favorites")}
      >
        <Ionicons
          name={currentTab === "favorites" ? "star" : "star-outline"}
          size={22}
          color={currentTab === "favorites" ? "#FFD700" : colors.subText}
        />
        <Text
          style={[
            styles.navText,
            { color: currentTab === "favorites" ? "#FFD700" : colors.subText },
          ]}
        >
          Favoriler
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setCurrentTab("map")}
      >
        <Ionicons
          name={currentTab === "map" ? "map" : "map-outline"}
          size={22}
          color={currentTab === "map" ? "#34C759" : colors.subText}
        />
        <Text
          style={[
            styles.navText,
            { color: currentTab === "map" ? "#34C759" : colors.subText },
          ]}
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
          size={22}
          color={currentTab === "home" ? colors.primary : colors.subText}
        />
        <Text
          style={[
            styles.navText,
            { color: currentTab === "home" ? colors.primary : colors.subText },
          ]}
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
          size={22}
          color={currentTab === "profile" ? colors.primary : colors.subText}
        />
        <Text
          style={[
            styles.navText,
            {
              color: currentTab === "profile" ? colors.primary : colors.subText,
            },
          ]}
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
          size={22}
          color={currentTab === "settings" ? colors.primary : colors.subText}
        />
        <Text
          style={[
            styles.navText,
            {
              color:
                currentTab === "settings" ? colors.primary : colors.subText,
            },
          ]}
        >
          Ayarlar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
