import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./ShopScreen.styles";

export default function ShopScreen() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [shopData, setShopData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const formatPhoneNumber = (text) => {
    const cleaned = ("" + text).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }

    return cleaned;
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const [profileRes, shopRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("shops").select("*").eq("owner_id", user.id).single(),
      ]);

      if (profileRes.data) setProfileData(profileRes.data);
      if (shopRes.data) setShopData(shopRes.data);
    } catch (error) {
      console.log("Veri çekme hatası:", error.message);
    } finally {
      setLoading(false);
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000",
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.content}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.fullName, { color: colors.text }]}>
                  {profileData?.full_name || "İsimsiz Kullanıcı"}
                </Text>
                <View style={styles.shopRow}>
                  <Ionicons name="briefcase" size={16} color={colors.primary} />
                  <Text style={[styles.shopName, { color: colors.subText }]}>
                    {shopData?.name || "Dükkan İsmi Ayarlanmadı"}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.verifiedBadge,
                  { backgroundColor: colors.primary + "20" },
                ]}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary}
                />
              </View>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Ionicons name="call" size={18} color={colors.subText} />
                <Text style={[styles.detailText, { color: colors.text }]}>
                  {profileData?.phone_number
                    ? formatPhoneNumber(
                        profileData.phone_number.replace("+90", ""),
                      )
                    : "Telefon Belirtilmemiş"}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="location" size={18} color={colors.subText} />
                <Text style={[styles.detailText, { color: colors.text }]}>
                  {profileData?.location || "Konum Belirtilmemiş"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="create-outline" size={20} color="#FFF" />
              <Text style={styles.editButtonText}>Bilgileri Güncelle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
