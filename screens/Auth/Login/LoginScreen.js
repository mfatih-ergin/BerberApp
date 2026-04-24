import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../styles/Colors";
import { authStyles as common } from "../Auth.styles";
import { loginStyles as styles } from "./LoginScreen.styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    loadRememberedEmail();
  }, []);

  async function loadRememberedEmail() {
    const savedEmail = await AsyncStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Hata", "Alanları doldurun");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      Alert.alert("Hata", error.message);
      setLoading(false);
    } else {
      if (rememberMe)
        await AsyncStorage.setItem("rememberedEmail", email.trim());
      else await AsyncStorage.removeItem("rememberedEmail");
      setLoading(false);
    }
  }

  return (
    <View style={{ minHeight: hp("45%"), justifyContent: "space-between" }}>
      <View>
        <View style={common.headerContainer}>
          <Text style={common.header}>Giriş Yap</Text>
          <Text style={common.subHeader}>
            Dükkanınıza veya hesabınıza erişin
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Şifre"
            placeholderTextColor="#999"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
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

        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Ionicons
            name={rememberMe ? "checkbox" : "square-outline"}
            size={22}
            color={rememberMe ? Colors.green : "#666"}
          />
          <Text style={styles.rememberMeText}>Beni Hatırla</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Giriş Yap</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
