import { FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons';
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({theme})=> theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`;
export const Content = styled.View`
  flex: 1;
  width: 80%;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
`;
export const Amount = styled.View`
  flex-direction: row;
  justify-content: space-between;

`;
export const Valor = styled.Text``;
export const Data = styled.Text``;
export const Cliente = styled.Text``;

export const Actions = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin-left: 18px;

`;
export const ActionButton = styled(BorderlessButton)`
  padding: 14px;
`;
export const Icon = styled(FontAwesome5)``;