import { BorderlessButton } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons';
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface IContainerProps{
  color: string;
}
export const Container = styled.View<IContainerProps>`
  background-color: ${({theme})=> theme.colors.shape};
  padding: 17px 24px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-evenly;
  
  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({color})=> color};
  flex: 1;
`;
export const Content = styled.View`
  flex: 1;
  width: 80%;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  margin-bottom: 4px;
`;
export const Amount = styled.View`
  flex-direction: row;
  justify-content: space-between;

`;
export const Valor = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;
export const Data = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
`;
export const Cliente = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Actions = styled.View`
  
  align-items: center;
  flex-direction: row;
  margin-left: 18px;

`;
export const ActionButton = styled(BorderlessButton)`
  padding: 14px;
`;
export const Icon = styled(FontAwesome5)``;