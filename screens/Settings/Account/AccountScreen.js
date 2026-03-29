import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../../lib/supabase";
import { useTheme } from "../../../context/ThemeContext";
import { styles } from "./AccountScreen.styles";
import SettingsHeader from "../SettingsHeader";

export default function AccountScreen({ onBack }) {
  const { colors } = useTheme();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        let { data, error, status } = await supabase
          .from("profiles")
          .select(`full_name, phone_number`)
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setFullName(data.full_name || "");
          setPhone(data.phone_number || "");
        }
      }
    } catch (error) {
      Alert.alert("Hata", "Profil bilgileri yüklenemedi: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    if (!fullName.trim()) {
      Alert.alert("Uyarı", "Lütfen adınızı ve soyadınızı giriniz.");
      return;
    }

    try {
      setUpdating(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const updates = {
        id: user.id,
        full_name: fullName.trim(),
        phone_number: phone.trim(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;
      Alert.alert("Başarılı", "Bilgileriniz güncellendi!");
    } catch (error) {
      Alert.alert("Hata", "Güncelleme başarısız: " + error.message);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, flex: 1 },
      ]}
    >
      <SettingsHeader title="Hesap Ayarları" onBack={onBack} />

      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.subText }]}>
          KİŞİSEL BİLGİLER
        </Text>

        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={[styles.inputRow, { borderBottomColor: colors.border }]}>
            <Ionicons name="person-outline" size={20} color={colors.subText} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Ad Soyad"
              placeholderTextColor={colors.subText}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={[styles.inputRow, { borderBottomWidth: 0 }]}>
            <Ionicons name="call-outline" size={20} color={colors.subText} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Telefon Numarası"
              placeholderTextColor={colors.subText}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.subText }]}>
          GÜVENLİK
        </Text>

        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={[styles.row, { borderBottomWidth: 0 }]}
            onPress={() =>
              Alert.alert(
                "Şifre",
                "Şifre sıfırlama e-postası kayıtlı adresinize gönderilsin mi?",
                [
                  { text: "Vazgeç", style: "cancel" },
                  {
                    text: "Gönder",
                    onPress: () =>
                      Alert.alert("Başarılı", "E-posta gönderildi!"),
                  },
                ],
              )
            }
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.text}
            />
            <Text style={[styles.rowText, { color: colors.text }]}>
              Şifre Değiştir
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.border} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.updateButton,
            { backgroundColor: colors.primary, opacity: updating ? 0.7 : 1 },
          ]}
          onPress={handleUpdate}
          disabled={updating}
        >
          {updating ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.updateButtonText}>Değişiklikleri Kaydet</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
