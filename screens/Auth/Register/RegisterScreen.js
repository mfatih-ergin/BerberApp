import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ROLES } from "../../../constants/roles";
import { Colors } from "../../../styles/Colors";
import { registerStyles as styles } from "./styles/RegisterScreen.styles";
import BarberRegisterScreen from "./BarberRegisterScreen";
import CustomerRegisterScreen from "./CustomerRegisterScreen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function RegisterScreen() {
  const [role, setRole] = useState(null);

  if (!role) {
    return (
      <View style={{ minHeight: hp("45%"), justifyContent: "space-between" }}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Hoş Geldiniz</Text>
            <Text style={styles.subHeader}>
              Kayıt olmak için hesap tipi seçin
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.roleButton, { backgroundColor: Colors.dark_green }]}
            onPress={() => setRole(ROLES.CUSTOMER)}
          >
            <Text style={styles.roleButtonText}>Müşteriyim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleButton, { backgroundColor: Colors.green }]}
            onPress={() => setRole(ROLES.BARBER)}
          >
            <Text style={styles.roleButtonText}>Berberim</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ minHeight: hp("55%") }}>
      {role === ROLES.BARBER ? (
        <BarberRegisterScreen onBack={() => setRole(null)} />
      ) : (
        <CustomerRegisterScreen onBack={() => setRole(null)} />
      )}
    </View>
  );
}
