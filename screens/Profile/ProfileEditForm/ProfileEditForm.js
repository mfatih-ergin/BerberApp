import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../../lib/supabase";
import { styles } from "./ProfileEditForm.styles";

export default function ProfileEditForm({
  updatedProfile,
  setUpdatedProfile,
  colors,
}) {
  const [uploading, setUploading] = useState(false);

  const pickAndUploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        setUploading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const fileExt = result.assets[0].uri.split(".").pop();
        const fileName = `${user.id}/${Date.now()}_profile.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, decode(result.assets[0].base64), {
            contentType: `image/${fileExt}`,
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName);

        setUpdatedProfile({ ...updatedProfile, avatarUrl: publicUrl });

        Alert.alert(
          "Başarılı",
          "Fotoğraf yüklendi, lütfen KAYDET butonuna basarak işlemi tamamlayın.",
        );
      }
    } catch (error) {
      Alert.alert("Hata", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.editForm}>
      <TouchableOpacity
        style={[
          styles.cameraButtonOverlay,
          { backgroundColor: colors.primary },
        ]}
        onPress={pickAndUploadImage}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Ionicons name="camera" size={18} color="#FFF" />
        )}
      </TouchableOpacity>

      <View
        style={[
          styles.inputWrapper,
          { borderColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <Ionicons
          name="person-outline"
          size={18}
          color={colors.primary}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.editInput, { color: colors.text }]}
          value={updatedProfile.fullName}
          onChangeText={(txt) =>
            setUpdatedProfile({ ...updatedProfile, fullName: txt })
          }
          placeholder="Ad Soyad"
        />
      </View>

      <View
        style={[
          styles.inputWrapper,
          { borderColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <Ionicons
          name="call-outline"
          size={18}
          color={colors.primary}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.editInput, { color: colors.text }]}
          value={updatedProfile.phoneNumber}
          onChangeText={(txt) =>
            setUpdatedProfile({ ...updatedProfile, phoneNumber: txt })
          }
          placeholder="Telefon"
          keyboardType="phone-pad"
        />
      </View>

      <View
        style={[
          styles.inputWrapper,
          { borderColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <Ionicons
          name="location-outline"
          size={18}
          color={colors.primary}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.editInput, { color: colors.text }]}
          value={updatedProfile.location}
          onChangeText={(txt) =>
            setUpdatedProfile({ ...updatedProfile, location: txt })
          }
          placeholder="Konum"
        />
      </View>
    </View>
  );
}
