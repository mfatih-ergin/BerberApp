import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { styles } from "./styles/RegisterScreen.styles";
import { ROLES } from "../../constants/roles";
import CommonRegisterFields from "./CommonRegisterFields";

export default function CustomerRegisterScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    location: "",
    gender: "erkek",
  });
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    const { email, password, fullName, phone, location, gender } = formData;

    if (!email || !password || !fullName || !location || !phone) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
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
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          full_name: fullName,
          role: ROLES.CUSTOMER,
          gender,
          phone_number: `+90${phone}`,
          location,
        },
      ]);

      if (!profileError) {
        Alert.alert("Başarılı!", "Müşteri kaydınız tamamlandı.");
      } else {
        Alert.alert("Profil Hatası", profileError.message);
      }
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
