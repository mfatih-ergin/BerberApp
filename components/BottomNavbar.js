import React from "react";
import { View } from "react-native";
import { styles } from "../screens/Home/HomeScreen.styles";
import NavbarItem from "./NavbarItem";
import { BARBER_NAV_ITEMS, CUSTOMER_NAV_ITEMS } from "../constants/navigation";
import { ROLES } from "../constants/roles";

export default function BottomNavbar({
  currentTab,
  setCurrentTab,
  colors,
  role,
}) {
  const navItems =
    role === ROLES.BARBER ? BARBER_NAV_ITEMS : CUSTOMER_NAV_ITEMS;

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
