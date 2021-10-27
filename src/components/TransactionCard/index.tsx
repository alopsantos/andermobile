import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Icon,
  Category,
  CategoryName,
  Date,
} from "./styles";

interface ICategory {
  name: string;
  icon: string;
}
export interface TransactionCardProps {
  type: 'confirmado' | 'não confirmado';
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}
interface IProps {
  data: TransactionCardProps;
}
export function TransactionCard({ data }: IProps) {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === 'não confirmado' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
