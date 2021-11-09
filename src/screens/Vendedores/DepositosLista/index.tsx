import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { useTheme } from "styled-components";
import { HeaderLayout } from "../../../components/Header";
import { HistoryDepositoCard } from "../../../components/HistoryDepositoCard";
import { useAuth } from "../../../hooks/auth";
import api from "../../../services/api";
import {
  Container,
  LoadContainer,
  Transactions,
  TransactionList,
} from "./styles";

export interface IDepositoProps {
  id: string;
  user_id: string;
  status: number;
  cliente: string;
  banco: string;
  valor: number;
  data: string;
}
export function DepositosLista() {
  const { user } = useAuth();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [depositos, setDepositos] = useState<IDepositoProps[]>([]);

  async function loadDepositosUser() {
    
    try {
      const {data} = await api.get(`/depositos?user_id=${user.id}`);
      
      const depositos: IDepositoProps[] = data.map(
        (deposito: IDepositoProps) => {
          const data = Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
          }).format(new Date(deposito.data))
          const valor = Number(deposito.valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          });
          return {
            id: deposito.id,
            status: deposito.status,
            cliente: deposito.cliente,
            banco: deposito.banco,
            valor,
            data,
          };
        }
      );

      setDepositos(depositos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadDepositosUser();
    }, [])
  );
  return (
    <Container>
      <HeaderLayout title="Lista de depositos" />
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Transactions>
          {depositos.length === 0 ? (
            <Text>Sem registro</Text>
          ) : (
            <TransactionList
              data={depositos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <HistoryDepositoCard data={item} />}
            />
          )}
        </Transactions>
      )}
    </Container>
  );
}
