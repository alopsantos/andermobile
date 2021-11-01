import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  margin: 8px;
  padding: 18px 24px;

  border-radius: 5px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: 20px;
  width: ${RFValue(175)}px;
`;

export const Informacao = styled.View``;

export const Info = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};

  margin-top: 8px;
`;

export const InfoEmail = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
  
  margin-top: 3px;
  `;

export const InfDate = styled.Text``;

export const Actions = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin-left: 18px;
`;

export const Icon = styled(FontAwesome5)`
  margin-left: 3px;
`;

export const ActionButton = styled(BorderlessButton)`
  padding: 14px;
`;
