import React, { useState } from "react";
import { ScrollView } from "react-native";
import { HeaderLayout } from "../../components/Header";
import { useAuth } from "../../hooks/auth";

import { Container } from "./styles";
interface ISubscribers {
  _id: string;
  nome: string;
  email: string;
  whatsapp: string;
  subscribeAt: string;
  status: number;
}
export function Inscrito() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Container>
      <HeaderLayout title="Inscrito" />

      <ScrollView>
        
      </ScrollView>
    </Container>
  );
}
