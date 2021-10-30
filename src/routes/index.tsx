import React from "react";
import { ActivityIndicator, View } from "react-native";

import AuthRoutes from "./auth.routes";
import { useAuth } from "../hooks/auth";
import { AppRoutes } from "./app.routes";

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#EF1C8F" />
      </View>
    );
  }
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
