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
  const [gender, setGender] = useState("erkek");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const countryCode = "+90";

  async function handleSignUp() {
    if (!email || !password || !fullName || !location || !phone) {
      Alert.alert("Hata", "Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    if (phone.length !== 10) {
      Alert.alert("Hata", "Telefon numarası 10 haneli olmalıdır (5xx...)");
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
          gender: gender,
          phone_number: `${countryCode}${phone}`,
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
        <Text style={styles.subHeader}>Hesap tipi seçin</Text>
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => setRole("customer")}
        >
          <Text style={styles.roleButtonText}>👤 Müşteriyim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, { backgroundColor: "#34C759" }]}
          onPress={() => setRole("barber")}
        >
          <Text style={styles.roleButtonText}>💈 Berberim</Text>
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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
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

          <Text style={styles.sectionTitle}>Cinsiyet</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderBox,
                gender === "erkek" && styles.genderBoxActive,
              ]}
              onPress={() => setGender("erkek")}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === "erkek" && styles.genderTextActive,
                ]}
              >
                Erkek
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderBox,
                gender === "kadın" && styles.genderBoxActive,
              ]}
              onPress={() => setGender("kadın")}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === "kadın" && styles.genderTextActive,
                ]}
              >
                Kadın
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
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

          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeBox}>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </View>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="5XX XXX XX XX"
              value={phone}
              onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Şehir"
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
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
