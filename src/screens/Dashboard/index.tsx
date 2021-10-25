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
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";

export default function Dashboard() {
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
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighLightCards  >
        <HighlightCard title="Entrada" amount="17.000,00" lastTransaction="Ultimo lançamento foi dia 12 de abril" type="up" />
        <HighlightCard title="Saia" amount="100,00" lastTransaction="Ultimo lançamento foi dia 12 de abril" type="down" />
        <HighlightCard title="Total" amount="17.100,00" lastTransaction="Ultimo lançamento foi dia 12 de abril" type="total" />
      </HighLightCards>
    </Container>
  );
}
