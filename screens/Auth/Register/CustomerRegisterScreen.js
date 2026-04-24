import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import { registerStyles as styles } from "./styles/RegisterScreen.styles";
import { ROLES } from "../../../constants/roles";
import CommonRegisterFields from "./CommonRegisterFields";
import RegisterHeader from "./RegisterHeader";

export default function CustomerRegisterScreen({ onBack }) {
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
      if (!profileError)
        Alert.alert("Başarılı!", "Müşteri kaydınız tamamlandı.");
      else Alert.alert("Hata", profileError.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.formWrapper}>
      <RegisterHeader onBack={onBack} title="Müşteri Kaydı" />

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
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
