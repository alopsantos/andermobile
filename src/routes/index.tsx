import React from "react";
import { ActivityIndicator, View } from "react-native";

import AuthRoutes from "./auth.routes";
import { useAuth } from "../hooks/auth";
import { AppRoutes } from "./app.routes";
import { AdminRoutes } from "./admin.routes";
import { AtacadoRoutes } from "./atacado.routes";
import { GerenciaRoutes } from "./gerencia.routes";

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#EF1C8F" />
      </View>
    );
  }
  // return user && user.setor === '2' ? <AppRoutes /> : <AuthRoutes />;
  if (user) {
    if(user.isAdmin === true){
      switch (user.setor) {
        case "2":
          return <AtacadoRoutes />;
        case "99":
          return <GerenciaRoutes />;
        default:
          return <AuthRoutes />;
      }
    }
    switch (user.setor) {
      case "2":
        return <AtacadoRoutes />;
      case "3":
        return <AppRoutes />;
      default:
        return <AuthRoutes />;
    }
  } else {
    return <AuthRoutes />;
  }
};

export default Routes;
