import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import {
  useFonts,
  HindSiliguri_400Regular,
  HindSiliguri_500Medium,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold,
} from "@expo-google-fonts/hind-siliguri";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from "../src/components/SplashScreen";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    HindSiliguri_400Regular,
    HindSiliguri_500Medium,
    HindSiliguri_600SemiBold,
    HindSiliguri_700Bold,
  });
  const [appReady, setAppReady] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    const originalTextRender = Text.render;
    Text.render = function (...args) {
      const origin = originalTextRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{ fontFamily: "HindSiliguri_400Regular" }, origin.props.style],
      });
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fontsLoaded && splashComplete) {
      setAppReady(true);
    }
  }, [fontsLoaded, splashComplete]);

  if (!appReady) return <SplashScreen />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AuthLayout />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerTitleStyle: {
        fontFamily: "HindSiliguri_600SemiBold",
        fontSize: 18,
      },
      headerTintColor: "red",
    }}>
      <Stack.Screen name="splash_screen" options={{ headerShown: false }}/>
      <Stack.Screen name="(app)" options={{ headerShown: false }}/>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: 'নতুন সদস্য নিবন্ধন করুন' }} />
      <Stack.Screen name="forget_password" options={{ title: "পাসওয়ার্ড ভুলে গেছেন" }}/>
      <Stack.Screen name="verify_code" options={{ title: "কোড ভেরিফিকেশন" }}/>
      <Stack.Screen name="reset_password" options={{ title: "পাসওয়ার্ড রিসেট" }}/>
      <Stack.Screen name="blood_request/index" options={{ title: "রক্তের আবেদন সমূহ" }}/>
      <Stack.Screen name="blood_request/[id]" options={{ title: "রক্তের আবেদনের বিস্তারিত" }}/>
      <Stack.Screen name="campaigns/index" options={{ title: "আসন্ন রক্তদান ক্যাম্পেইন" }}/>
      <Stack.Screen name="campaigns/[id]" options={{ title: "ক্যাম্পেইনের বিস্তারিত" }}/>
      <Stack.Screen name="profile/[id]/update" options={{ title: "প্রোফাইল সম্পাদনা" }}/>
      <Stack.Screen name="profile/[id]/last_donate" options={{ title: "সর্বশেষ দান আপডেট" }}/>
      <Stack.Screen name="profile/[id]/password_change" options={{ title: "পাসওয়ার্ড পরিবর্তন" }}/>
      <Stack.Screen name="profile/[id]/helps" options={{ title: "সাহায্য ও সমর্থন" }}/>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}