import React from "react";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "react-native";

import theme from "./src/global/styles/theme";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { AppProvider } from "./src/hooks";
import { AuthRoutes } from "./src/routes/auth.routes";
import { SignIn } from "./src/screens/SignIn";
import { Dashboard } from "./src/screens/Dashboard";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </ThemeProvider>
  );
}
