import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="(pages)/sell"
          options={{ title: "Sell Items", headerShown: false }}
        />
        <Stack.Screen
          name="(pages)/inventory"
          options={{ title: "Inventory", headerShown: false }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Homepage",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
