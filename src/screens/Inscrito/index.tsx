import React, { useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/core";

import { HeaderLayout } from "../../components/Header";
import { InscritosCard } from "../../components/IncritosCard";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

import { Container, ListaInscritos } from "./styles";

export interface ISubscribers {
  id: string;
  status: boolean;
  name: string;
  email: string;
  whatsapp: string;
  isLogista: string;
  created_at: string;
}
export function Inscrito() {
  const { user } = useAuth();
  const [clientes, setClientes] = useState<ISubscribers[]>([]);

  async function loadingSubscribers() {
    try {
      const { data } = await api.get("/subscribers/lista?status=false");
      const clientes = data.map((cliente: any) => {
        return {
          id: cliente.id,
          name: cliente.name,
          whatsapp: cliente.whatsapp,
          email: cliente.email,
          created_at: format(parseISO(cliente.created_at), "dd/MM/yy", {
            locale: ptBR,
          }),
          status: cliente.status,
        };
      });
      setClientes(clientes);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadingSubscribers();
    }, [])
  );
  return (
    <Container>
      <HeaderLayout title="Inscrito" />

      <ListaInscritos
        data={clientes}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        renderItem={({ item }) => <InscritosCard data={item} />}
      />
    </Container>
  );
}
