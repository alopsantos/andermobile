import React, { useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/core";


import { HeaderLayout } from "../../components/Header";
import { InscritosCard } from "../../components/IncritosCard";
import { useAuth } from "../../hooks/auth";
import api from '../../services/api';

import { Container, ListaInscritos } from "./styles";
import axios from "axios";
export interface ISubscribers {
  _id: string;
  nome: string;
  email: string;
  whatsapp: string;
  subscribeAt: string;
  status: number;
}
export function Inscrito() {
  const { user } = useAuth();
  const [clientes, setClientes] = useState<ISubscribers[]>([]);
  
  async function loadingSubscribers(){
    try {
      const { data } = await axios.get("https://alinemezzaribrand.com.br/api/subscribers/entraremcontato");

      const clientes = data.map((cliente: any) => {
        return {
          _id: cliente._id,
          nome: cliente.nome,
          whatsapp: cliente.whatsapp,
          email: cliente.email,
          subscribeAt: format(parseISO(cliente.subscribeAt), "dd/MM/yy", {
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
        keyExtractor={(item) => item._id}
        renderItem={({item}) => <InscritosCard data={item} />}
      />
    </Container>
  );
}
