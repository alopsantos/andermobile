import styled from "styled-components/native";
import { FlatList } from "react-native";

import { IDepositoProps } from ".";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(2)}px;
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<IDepositoProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;


export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;