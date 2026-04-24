import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { registerStyles as styles } from "./styles/RegisterScreen.styles";
import { ROLES } from "../../../constants/roles";
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
    const { email, password, fullName, phone, location, gender, shopName } =
      formData;
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
      if (!pErr) {
        await supabase.from("shops").insert([
          {
            owner_id: data.user.id,
            name: formData.shopName,
            address: formData.shopAddress,
          },
        ]);
      }
      Alert.alert("Başarılı!", "Berber kaydınız tamamlandı.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.formWrapper}>
      <RegisterHeader onBack={onBack} title="Berber Kaydı" />

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
        placeholderTextColor="#999"
        value={formData.shopName}
        onChangeText={(t) => setFormData({ ...formData, shopName: t })}
      />

      <TextInput
        style={[styles.input, { height: hp("10%"), textAlignVertical: "top" }]}
        placeholder="Dükkan Adresi"
        placeholderTextColor="#999"
        value={formData.shopAddress}
        onChangeText={(t) => setFormData({ ...formData, shopAddress: t })}
        multiline
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
