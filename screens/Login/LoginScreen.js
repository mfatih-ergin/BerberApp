import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./LoginScreen.styles";
import { Colors } from "../../styles/Colors";

const localBgImage = require("../../images/Login-Background-Image.png");

export default function LoginScreen({ onNavigateToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    loadRememberedEmail();
  }, []);

  async function loadRememberedEmail() {
    try {
      const savedEmail = await AsyncStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (e) {
      console.log("E-posta yükleme hatası:", e);
    }
  }

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      Alert.alert("Giriş Başarısız", error.message);
      setLoading(false);
    } else {
      try {
        if (rememberMe) {
          await AsyncStorage.setItem("rememberedEmail", email.trim());
        } else {
          await AsyncStorage.removeItem("rememberedEmail");
        }
      } catch (e) {
        console.log("Kaydetme hatası:", e);
      }
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ImageBackground
        source={localBgImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.whiteCard}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.header}>Giriş Yap</Text>
                    <Text style={styles.subHeader}>Hesabınıza giriş yapın</Text>
                  </View>

                  <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="E-posta"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </View>

                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Şifre"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        <Ionicons
                          name={
                            isPasswordVisible
                              ? "eye-outline"
                              : "eye-off-outline"
                          }
                          size={22}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.rememberMeContainer}
                      onPress={() => setRememberMe(!rememberMe)}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={rememberMe ? "checkbox" : "square-outline"}
                        size={22}
                        color={rememberMe ? Colors.green : "#CCC"}
                      />
                      <Text style={styles.rememberMeText}>Beni Hatırla</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSignIn}
                      disabled={loading}
                    >
                      <Text style={styles.buttonText}>
                        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                      <Text style={styles.footerText}>Hesabınız yok mu? </Text>
                      <TouchableOpacity onPress={onNavigateToRegister}>
                        <Text style={styles.linkText}>Kayıt Ol</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
}
