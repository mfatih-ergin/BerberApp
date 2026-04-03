import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { supabase } from "../lib/supabase";
import { styles } from "../screens/Home/HomeScreen.styles";
import NavbarItem from "./NavbarItem";

export default function BottomNavbar({ currentTab, setCurrentTab, colors }) {
  const [role, setRole] = useState("customer");

  useEffect(() => {
    getUserRole();
  }, []);

  async function getUserRole() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (data) setRole(data.role);
      }
    } catch (error) {
      console.log("Rol çekme hatası:", error.message);
    }
  }

  const barberItems = [
    {
      id: "analytics",
      label: "Analiz",
      icon: "analytics",
      activeColor: "#FFD700",
    },
    {
      id: "calendar",
      label: "Takvim",
      icon: "calendar",
      activeColor: "#34C759",
    },
    { id: "home", label: "Ana Sayfa", icon: "home" },
    { id: "shop", label: "Dükkan", icon: "storefront" },
    { id: "settings", label: "Ayarlar", icon: "settings" },
  ];

  const customerItems = [
    {
      id: "favorites",
      label: "Favoriler",
      icon: "star",
      activeColor: "#FFD700",
    },
    { id: "map", label: "Harita", icon: "map", activeColor: "#34C759" },
    { id: "home", label: "Ana Sayfa", icon: "home" },
    { id: "profile", label: "Profil", icon: "person" },
    { id: "settings", label: "Ayarlar", icon: "settings" },
  ];

  const navItems = role === "barber" ? barberItems : customerItems;

  return (
    <View
      style={[
        styles.bottomNavbar,
        { backgroundColor: colors.card, borderTopColor: colors.border },
      ]}
    >
      {navItems.map((item) => (
        <NavbarItem
          key={item.id}
          item={item}
          isActive={currentTab === item.id}
          onPress={() => setCurrentTab(item.id)}
          colors={colors}
        />
      ))}
    </View>
  );
}
