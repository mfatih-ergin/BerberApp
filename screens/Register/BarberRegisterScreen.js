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
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { styles } from "./styles/RegisterScreen.styles";
import { ROLES } from "../../constants/roles";
import CommonRegisterFields from "./CommonRegisterFields";
import RegisterHeader from "./RegisterHeader";

export default function BarberRegisterScreen({ onBack }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    location: "",
    gender: "erkek",
    shopName: "",
    shopAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    const {
      email,
      password,
      fullName,
      phone,
      location,
      gender,
      shopName,
      shopAddress,
    } = formData;
    if (!email || !password || !fullName || !location || !phone || !shopName) {
      Alert.alert("Hata", "Lütfen dükkan ismi dahil tüm alanları doldurun.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert("Hata", error.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      const { error: pErr } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          full_name: fullName,
          role: ROLES.BARBER,
          gender,
          phone_number: `+90${phone}`,
          location,
        },
      ]);
      if (!pErr)
        await supabase
          .from("shops")
          .insert([
            { owner_id: data.user.id, name: shopName, address: shopAddress },
          ]);
      Alert.alert("Başarılı!", "Berber kaydınız tamamlandı.");
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <CommonRegisterFields
          formData={formData}
          setFormData={setFormData}
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
        />

        <Text style={styles.sectionTitle}>Dükkan Bilgileri</Text>
        <TextInput
          style={styles.input}
          placeholder="Dükkan Adı"
          value={formData.shopName}
          onChangeText={(t) => setFormData({ ...formData, shopName: t })}
        />
        <TextInput
          style={[styles.input, { height: hp("10%") }]}
          placeholder="Dükkan Adresi"
          value={formData.shopAddress}
          onChangeText={(t) => setFormData({ ...formData, shopAddress: t })}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
