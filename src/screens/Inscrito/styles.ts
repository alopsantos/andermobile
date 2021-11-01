import { getBottomSpace } from "react-native-iphone-x-helper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import {ISubscribers} from '.';

export const Container = styled.View`
  flex: 1;
`;

export const ListaInscritos = styled(
  FlatList as new () => FlatList<ISubscribers>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;