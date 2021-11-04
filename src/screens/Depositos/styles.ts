import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Form = styled.View`
  flex: 1;

  margin-top: ${RFPercentage(4)}px;
  padding: 24px;

  justify-content: space-between;
`;

export const Fields = styled.View`

`;