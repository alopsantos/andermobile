import React from "react";
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
  LogoutButton
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardProps {
  id: string;
}
export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: 1,
      type: "confirmado",
      title: "Anderson Lopes",
      amount: "R$ 120,00",
      date: "13/10/2021",
      category: {
        name: "0001-PIX",
        icon: "dollar-sign",
      },
    },
    {
      id: 2,
      type: "não confirmado",
      title: "Anderson Lopes",
      amount: "R$ 120,00",
      date: "13/10/2021",
      category: {
        name: "0001-PIX",
        icon: "dollar-sign",
      },
    },
    {
      id: 3,
      type: "não confirmado",
      title: "Anderson Lopes",
      amount: "R$ 120,00",
      date: "13/10/2021",
      category: {
        name: "0001-PIX",
        icon: "dollar-sign",
      },
    },
    {
      id: 4,
      type: "não confirmado",
      title: "Anderson Lopes",
      amount: "R$ 120,00",
      date: "13/10/2021",
      category: {
        name: "0001-PIX",
        icon: "dollar-sign",
      },
    },
    {
      id: 5,
      type: "não confirmado",
      title: "Anderson Lopes",
      amount: "R$ 120,00",
      date: "13/10/2021",
      category: {
        name: "0001-PIX",
        icon: "dollar-sign",
      },
    },
  ];

  return (
    <Container>
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
          amount="17.000,00"
          lastTransaction="Ultimo lançamento foi dia 12 de abril"
          type="up"
        />
        <HighlightCard
          title="Saia"
          amount="100,00"
          lastTransaction="Ultimo lançamento foi dia 12 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="17.100,00"
          lastTransaction="Ultimo lançamento foi dia 12 de abril"
          type="total"
        />
      </HighLightCards>
      <Transactions>
        <Title>Depositos</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
