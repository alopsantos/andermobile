import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer,
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

export interface IDataListProps extends TransactionCardProps {
  id: string;
}
interface IHighLightProps {
  amount: string;
  lastTransaction: string;
}
interface IHighLightData {
  entries: IHighLightProps;
  expensives: IHighLightProps;
  total: IHighLightProps;
}
export function Dashboard() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransacrions] = useState<IDataListProps[]>([]);
  const [HighLightData, setHighLightData] = useState<IHighLightData>(
    {} as IHighLightData
  );

  function getLastTransactionDate(
    collection: IDataListProps[],
    type: "positivo" | "negativo"
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }
  async function loadTransactions() {
    const dataKey = "@ander:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (item: IDataListProps) => {
        if (item.type === "positivo") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          type: item.type,
          category: item.category,
        };
      }
    );
    setTransacrions(transactionsFormatted);
    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positivo"
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negativo"
    );
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }
  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );
  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "http://appander.s3.amazonaws.com/avatar/355bb8ba797fd4eef96bf3763538988b.jpeg",
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Anderson Lopes</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighLightCards>
            <HighlightCard
              title="Entrada"
              amount={HighLightData.entries.amount}
              lastTransaction={HighLightData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saia"
              amount={HighLightData.expensives.amount}
              lastTransaction={HighLightData.expensives.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={HighLightData.total.amount}
              lastTransaction={HighLightData.total.lastTransaction}
              type="total"
            />
          </HighLightCards>
          <Transactions>
            <Title>Depositos</Title>

            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
