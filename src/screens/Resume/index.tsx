import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { HeaderLayout } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";

import { Container, Content, ChartContainer } from "./styles";

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
  total: number;
  totalFormated: string;
  color: string;
  percent: string;
}
export function Resume() {
  const theme = useTheme();
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
    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: ITransactionData) => {
        return acumullator + Number(expensive.amount);
      },
      0
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
        const totalFormated = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategoy.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormated,
          percent,
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

      <ChartContainer>
        <VictoryPie
          data={totalByCategories}
          x="percent"
          colorScale={totalByCategories.map((category) => category.color)}
          y="total"
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: "bold",
              fill: theme.colors.shape,
            },
          }}
          labelRadius={50}
        />
      </ChartContainer>
      <Content
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormated}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
