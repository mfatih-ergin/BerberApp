// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { supabase } from "./lib/supabase";

// import LoginScreen from "./screens/Login/LoginScreen";
// import RegisterScreen from "./screens/Register/RegisterScreen";
// import HomeScreen from "./screens/Home/HomeScreen";

// import { ThemeProvider, useTheme } from "./context/ThemeContext";

// export default function App() {
//   return (
//     <ThemeProvider>
//       <MainLayout />
//     </ThemeProvider>
//   );
// }

// function MainLayout() {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isRegistering, setIsRegistering] = useState(false);

//   const { theme } = useTheme();

//   useEffect(() => {
//     const getSession = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();
//       if (error) console.log("Oturum kontrol hatası:", error.message);
//       setSession(session);
//       setLoading(false);
//     };

//     getSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={{ marginTop: 10 }}>Uygulama Hazırlanıyor...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.fullContainer}>
//       <StatusBar style={theme === "dark" ? "light" : "dark"} />

//       {session ? (
//         <HomeScreen />
//       ) : isRegistering ? (
//         <RegisterScreen onNavigateToLogin={() => setIsRegistering(false)} />
//       ) : (
//         <LoginScreen onNavigateToRegister={() => setIsRegistering(true)} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   fullContainer: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "./lib/supabase";

import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import HomeScreen from "./screens/Home/HomeScreen";

import { ThemeProvider, useTheme } from "./context/ThemeContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

function MainLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    async function prepareApp() {
      try {
        await Font.loadAsync(Ionicons.font);

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) console.log("Oturum kontrol hatası:", error.message);
        setSession(session);
      } catch (e) {
        console.warn("Uygulama hazırlık hatası:", e);
      } finally {
        setLoading(false);
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme === "dark" ? "#131316" : "#fff" },
        ]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text
          style={{ marginTop: 10, color: theme === "dark" ? "#fff" : "#000" }}
        >
          Uygulama Hazırlanıyor...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      {session ? (
        <HomeScreen />
      ) : isRegistering ? (
        <RegisterScreen onNavigateToLogin={() => setIsRegistering(false)} />
      ) : (
        <LoginScreen onNavigateToRegister={() => setIsRegistering(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
