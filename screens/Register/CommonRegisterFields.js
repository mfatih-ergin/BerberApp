import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/RegisterScreen.styles";

export default function CommonRegisterFields({
  formData,
  setFormData,
  isPasswordVisible,
  setIsPasswordVisible,
}) {
  return (
    <>
      <Text style={styles.sectionTitle}>Cinsiyet</Text>
      <View style={styles.genderContainer}>
        {["erkek", "kadın"].map((g) => (
          <TouchableOpacity
            key={g}
            style={[
              styles.genderBox,
              formData.gender === g && styles.genderBoxActive,
            ]}
            onPress={() => setFormData({ ...formData, gender: g })}
          >
            <Text
              style={[
                styles.genderText,
                formData.gender === g && styles.genderTextActive,
              ]}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={formData.fullName}
        onChangeText={(t) => setFormData({ ...formData, fullName: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={formData.email}
        onChangeText={(t) => setFormData({ ...formData, email: t })}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.phoneInputContainer}>
        <View style={styles.countryCodeBox}>
          <Text style={styles.countryCodeText}>+90</Text>
        </View>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="5XX XXX XX XX"
          value={formData.phone}
          onChangeText={(t) =>
            setFormData({ ...formData, phone: t.replace(/[^0-9]/g, "") })
          }
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Şehir"
        value={formData.location}
        onChangeText={(t) => setFormData({ ...formData, location: t })}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Şifre"
          value={formData.password}
          onChangeText={(t) => setFormData({ ...formData, password: t })}
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
    </>
  );
}
