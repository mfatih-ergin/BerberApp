import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../lib/supabase";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./ProfileScreen.styles";
import ProfileEditForm from "./ProfileEditForm/ProfileEditForm";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        let { data, error } = await supabase
          .from("profiles")
          .select("full_name, phone_number, location, avatar_url")
          .eq("id", user.id)
          .single();
        if (error) throw error;
        if (data) {
          const userData = {
            fullName: data.full_name || "",
            phoneNumber: data.phone_number || "",
            location: data.location || "",
            avatarUrl: data.avatar_url || "",
          };
          setProfile(userData);
          setUpdatedProfile(userData);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: updatedProfile.fullName,
          phone_number: updatedProfile.phoneNumber,
          location: updatedProfile.location,
          avatar_url: updatedProfile.avatarUrl,
        })
        .eq("id", user.id);

      if (error) throw error;
      setProfile(updatedProfile);
      setIsEditing(false);
      Alert.alert("Başarılı", "Profiliniz güncellendi! 🎉");
    } catch (error) {
      Alert.alert("Hata", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAvatarSource = () => {
    const url = isEditing ? updatedProfile.avatarUrl : profile.avatarUrl;
    if (url) return { uri: url };
    return {
      uri: `https://ui-avatars.com/api/?name=${profile.fullName || "User"}&background=random&size=200&rounded=true`,
    };
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "Telefon eklenmemiş";
    const cleaned = ("" + phone).replace(/\D/g, "");
    const match = cleaned.match(/^(?:0|90)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    return phone;
  };

  if (loading && !isEditing) {
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.profileHeaderCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View
            style={[styles.avatarContainer, { borderColor: colors.background }]}
          >
            <Image source={getAvatarSource()} style={styles.avatar} />
          </View>

          <View style={styles.userInfo}>
            {isEditing ? (
              <ProfileEditForm
                updatedProfile={updatedProfile}
                setUpdatedProfile={setUpdatedProfile}
                colors={colors}
              />
            ) : (
              <>
                <Text style={[styles.userName, { color: colors.text }]}>
                  {profile.fullName || "İsimsiz"}
                </Text>
                <View style={styles.contactRow}>
                  <Ionicons
                    name="call-outline"
                    size={14}
                    color={colors.primary}
                  />
                  <Text style={[styles.contactText, { color: colors.subText }]}>
                    {formatPhoneNumber(profile.phoneNumber)}
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={colors.primary}
                  />
                  <Text style={[styles.contactText, { color: colors.subText }]}>
                    {profile.location || "Konum yok"}
                  </Text>
                </View>
              </>
            )}
          </View>

          {isEditing ? (
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={handleSave}
              >
                <Text style={styles.editButtonText}>KAYDET</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: colors.primary }]}
                onPress={() => {
                  setIsEditing(false);
                  setUpdatedProfile(profile);
                }}
              >
                <Text
                  style={[styles.editButtonText, { color: colors.primary }]}
                >
                  İPTAL
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>PROFİLİ DÜZENLE</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
