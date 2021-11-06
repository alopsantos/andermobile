import React from "react";
import { Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from "../screens/Dashboard";
import { Depositos } from "../screens/Depositos";
import { Inscrito } from "../screens/Inscrito";
import { DepositosLista } from "../screens/Vendedores/DepositosLista";
import { useAuth } from "../hooks/auth";

export function AppRoutes() {
  const theme = useTheme();
  const {user} = useAuth();

  return (
    <Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secundary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      
      <Screen name="Home" component={Dashboard}options={{tabBarIcon: (({size, color}) => <MaterialIcons name="format-list-bulleted" size={size} color={color} />)}} />
      <Screen name="Depositos" component={DepositosLista}options={{tabBarIcon: (({size, color}) => <MaterialIcons name="format-list-bulleted" size={size} color={color} />)}} />
      <Screen name="Enviar" component={Depositos} options={{tabBarIcon: (({size, color}) => <MaterialIcons name="attach-money" size={size} color={color} />)}} />
      
    </Navigator>
  );
}
