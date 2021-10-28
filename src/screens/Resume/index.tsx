import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { HeaderLayout } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";

import { Container, Content } from "./styles";

interface ITransactionData {
  type: "positivo" | "negativo";
  name: string;
  amount: string;
  category: string;
  date: string;
  color: string;
}
interface ICategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}
export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
    []
  );
  async function loadData() {
    const dataKey = "@ander:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: ITransactionData) => expensive.type === "negativo"
    );

    const totalByCategoy: ICategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: ITransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        totalByCategoy.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    setTotalByCategories(totalByCategoy);
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <HeaderLayout title="Resumo" />

      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
