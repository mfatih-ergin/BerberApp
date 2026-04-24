import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { authStyles as styles } from "./Auth.styles";
import LoginScreen from "./Login/LoginScreen";
import RegisterScreen from "./Register/RegisterScreen";

const localBgImage = require("../../images/Login-Background-Image.png");

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState("login");

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
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                      styles.loginTabButton,
                      activeTab === "login" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("login")}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === "login" && styles.activeTabText,
                      ]}
                    >
                      Giriş Yap
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                      styles.registerTabButton,
                      activeTab === "register" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("register")}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === "register" && styles.activeTabText,
                      ]}
                    >
                      Kayıt Ol
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.whiteCard]}>
                  {activeTab === "login" ? (
                    <LoginScreen
                      onNavigateToRegister={() => setActiveTab("register")}
                    />
                  ) : (
                    <RegisterScreen
                      onNavigateToLogin={() => setActiveTab("login")}
                    />
                  )}
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
}
