import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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
  const [deleting, setDeleting] = useState(false);

  const handlePasswordReset = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.auth.resetPasswordForEmail(user.email);
        if (error) throw error;
        Alert.alert(
          "Başarılı",
          "Şifre sıfırlama e-postası e-posta adresinize gönderildi.",
        );
      }
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Hesabı Sil",
      "Hesabınızı ve tüm verilerinizi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      [
        { text: "Vazgeç", style: "cancel" },
        {
          text: "Evet, Sil",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(true);
              const {
                data: { user },
              } = await supabase.auth.getUser();

              if (!user) throw new Error("Kullanıcı bulunamadı.");

              const userId = user.id;

              const { data: profileData } = await supabase
                .from("profiles")
                .select("avatar_url")
                .eq("id", userId)
                .single();

              if (profileData?.avatar_url) {
                const urlParts = profileData.avatar_url.split("/");
                const fileName = urlParts[urlParts.length - 1];
                const fullPath = `${userId}/${fileName}`;

                const { error: storageError } = await supabase.storage
                  .from("avatars")
                  .remove([fullPath]);

                if (storageError) {
                  console.log(
                    "Resim silinemedi (Dosya bulunamadı veya yetki sorunu):",
                    storageError.message,
                  );
                }
              }

              const { error: deleteError } = await supabase
                .from("profiles")
                .delete()
                .eq("id", user.id);

              if (deleteError) throw deleteError;

              await supabase.auth.signOut();
              Alert.alert("Hoşça Kalın", "Hesabınız başarıyla silindi.");
            } catch (error) {
              Alert.alert(
                "Hata",
                "Hesap silinirken bir sorun oluştu: " + error.message,
              );
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

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
            onPress={handlePasswordReset}
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.text}
            />
            <Text style={[styles.rowText, { color: colors.text }]}>
              Şifre Sıfırlama E-postası Gönder
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.border} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: "#FF3B30" }]}>
          HESABI SİL
        </Text>
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={[styles.row, { borderBottomWidth: 0 }]}
            onPress={handleDeleteAccount}
            disabled={deleting}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
            <Text style={[styles.rowText, { color: "#FF3B30" }]}>
              {deleting ? "Hesap Siliniyor..." : "Hesabı Kalıcı Olarak Sil"}
            </Text>
            {deleting ? (
              <ActivityIndicator size="small" color="#FF3B30" />
            ) : (
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.border}
              />
            )}
          </TouchableOpacity>
        </View>

        <Text style={[styles.infoText, { color: colors.subText }]}>
          Hesabınızı sildiğinizde randevularınız, dükkan bilgileriniz ve
          profiliniz kalıcı olarak sistemden kaldırılır.
        </Text>
      </ScrollView>
    </View>
  );
}
