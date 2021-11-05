import React from "react";
import { useTheme } from "styled-components";
import { categories } from "../../utils/categories";

import {
  Container,
  Content,
  Title,
  Amount,
  Valor,
  Data,
  Cliente,
  Actions,
  ActionButton,
  Icon
} from "./styled";

interface IDepositoProps {
  id: string;
  user_id: string;
  status: number;
  cliente: string;
  banco: string;
  valor: number;
  data: Date;
}

interface IProps {
  data: IDepositoProps;
}
export function HistoryDepositoCard({ data }: IProps) {
  const theme = useTheme();
  const [category] = categories.filter((item) => item.key === data.banco);
  return (
    <Container>
      <Content>
        <Title>{category.name}</Title>
        <Cliente>{data.cliente}</Cliente>
        <Amount>
          <Valor>{data.valor}</Valor>
          <Data>25/11/1988</Data>
        </Amount>
      </Content>
      <Actions>
        <ActionButton>
          <Icon name="check-circle" color={theme.colors.text} size={32} />
        </ActionButton>
      </Actions>
    </Container>
  );
}
