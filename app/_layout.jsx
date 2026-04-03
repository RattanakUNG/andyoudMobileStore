import { Stack } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import "./globals.css";

if (Platform.OS !== "web" && typeof StyleSheet.setFlag === "function") {
  StyleSheet.setFlag("darkMode", "class");
}

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
