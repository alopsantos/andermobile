import React from "react";
import { Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";
import { Inscrito } from "../screens/Inscrito";
import { useAuth } from "../hooks/auth";

export function AdminRoutes() {
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
      
      <Screen name="Listagem" component={Dashboard} options={{tabBarIcon: (({size, color}) => <MaterialIcons name="format-list-bulleted" size={size} color={color} />)}} />
      <Screen name="Registro" component={Register} options={{tabBarIcon: (({size, color}) => <MaterialIcons name="attach-money" size={size} color={color} />)}} />
      <Screen name="Resumo" component={Resume}options={{tabBarIcon: (({size, color}) => <MaterialIcons name="pie-chart" size={size} color={color} />)}} />
      <Screen name="Inscrito" component={Inscrito}options={{tabBarIcon: (({size, color}) => <MaterialIcons name="question-answer" size={size} color={color} />)}} />
    </Navigator>
  );
}
