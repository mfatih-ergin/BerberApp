import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { styles } from "./RegisterScreen.styles";

export default function RegisterScreen({ onNavigateToLogin }) {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function handleSignUp() {
    if (!email || !password || !fullName || !location) {
      Alert.alert("Hata", "Lütfen konum dahil tüm zorunlu alanları doldurun.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert("Hata", error.message);
      setLoading(false);
      return;
    }

    const user = data?.user;
    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          full_name: fullName,
          role: role,
          phone_number: phone,
          location: location,
        },
      ]);

      if (profileError) {
        Alert.alert("Profil Hatası", profileError.message);
      } else if (role === "barber") {
        await supabase
          .from("shops")
          .insert([
            { owner_id: user.id, name: shopName, address: shopAddress },
          ]);
      }
      Alert.alert("Başarılı!", "Kayıt işleminiz tamamlandı.");
    }
    setLoading(false);
  }

  if (!role) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={onNavigateToLogin}
          style={[styles.backButtonContainer, { marginBottom: 40 }]}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
          <Text style={styles.backButtonText}> Geri Dön</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Hoş Geldiniz</Text>
        <Text style={styles.subHeader}>
          Devam etmek için bir hesap tipi seçin
        </Text>

        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => setRole("customer")}
        >
          <Text style={styles.roleButtonText}>👤 Müşteriyim</Text>
          <Text style={styles.roleDescription}>Randevu almak istiyorum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, { backgroundColor: "#34C759" }]}
          onPress={() => setRole("barber")}
        >
          <Text style={styles.roleButtonText}>💈 Berberim</Text>
          <Text style={styles.roleDescription}>
            Dükkanımı yönetmek istiyorum
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity
            onPress={() => setRole(null)}
            style={styles.backButtonContainer}
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </TouchableOpacity>

          <Text style={styles.header}>
            {role === "barber" ? "Berber Kaydı" : "Müşteri Kaydı"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Telefon"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Şehir (Örn: İstanbul)"
            value={location}
            onChangeText={setLocation}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {role === "barber" && (
            <View>
              <Text style={styles.sectionTitle}>Dükkan Bilgileri</Text>
              <TextInput
                style={styles.input}
                placeholder="Dükkan Adı"
                value={shopName}
                onChangeText={setShopName}
              />
              <TextInput
                style={[styles.input, { height: hp("10%") }]}
                placeholder="Dükkan Adresi"
                value={shopAddress}
                onChangeText={setShopAddress}
                multiline
              />
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: role === "barber" ? "#34C759" : "#007AFF" },
            ]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Kaydediliyor..." : "Kayıt Ol"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNavigateToLogin}
            style={{ marginTop: 20, alignItems: "center" }}
          >
            <Text style={{ color: "#666" }}>
              Zaten hesabınız var mı?{" "}
              <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
                Giriş Yap
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
