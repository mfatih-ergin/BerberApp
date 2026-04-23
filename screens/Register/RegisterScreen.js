import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles/RegisterScreen.styles";
import { ROLES } from "../../constants/roles";
import RegisterHeader from "./RegisterHeader";
import BarberRegisterScreen from "./BarberRegisterScreen";
import CustomerRegisterScreen from "./CustomerRegisterScreen";
import { Colors } from "../../styles/Colors";

export default function RegisterScreen({ onNavigateToLogin }) {
  const [role, setRole] = useState(null);

  const handleBack = () => {
    if (role) {
      setRole(null);
    } else {
      onNavigateToLogin();
    }
  };

  const getHeaderTitle = () => {
    if (role === ROLES.BARBER) return "Berber Kaydı";
    if (role === ROLES.CUSTOMER) return "Müşteri Kaydı";
    return "Kayıt Ol";
  };

  return (
    <SafeAreaView style={styles.container}>
      <RegisterHeader onBack={handleBack} title={getHeaderTitle()} />

      {!role ? (
        <View style={styles.selectionContent}>
          <Text style={styles.header}>Hoş Geldiniz</Text>
          <Text style={styles.subHeader}>
            Kayıt olmak için hesap tipi seçin
          </Text>

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
      ) : role === ROLES.BARBER ? (
        <BarberRegisterScreen />
      ) : (
        <CustomerRegisterScreen />
      )}
    </SafeAreaView>
  );
}
