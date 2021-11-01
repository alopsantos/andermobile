import axios from "axios";
import React from "react";
import { Alert, Linking, View } from "react-native";
import { useTheme } from "styled-components";
import api from "../../services/api";

import {
  Container,
  Title,
  Informacao,
  Info,
  Actions,
  Icon,
  ActionButton,
  InfoEmail,
} from "./styles";

interface IProps {
  data: ISubscribers;
}
interface ISubscribers {
  _id: string;
  nome: string;
  email: string;
  whatsapp: string;
  subscribeAt: string;
  status: number;
}

export function InscritosCard({ data }: IProps) {
  const theme = useTheme();
  function handlePresWhatsapp(whatsapp: string, clienteNome: string) {
    Linking.openURL(
      `whatsapp://send?phone=55${whatsapp}&text=Olá ${clienteNome} tudo bom?`
    );
  }

  const createTwoBottonAlert = (codigo: string) => {
    Alert.alert(
      "Atendimento",
      "Você realmente entrou em contato?",
      [
        {
          text: "Ops, não!",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => contatoFeito(codigo),
        },
      ],
      { cancelable: false }
    );
  };

  async function contatoFeito(codigo: string) {
    await axios.post(
      "https://alinemezzaribrand.com.br/api/subscribers/update",
      {
        id: codigo,
      }
    );
    console.log(codigo)
  }
  return (
    <Container>
      <View style={{flexDirection: "row"}}>
        <Informacao>
          <Title ellipsizeMode="tail" numberOfLines={1}>
            {data.nome}
          </Title>
          <Info ellipsizeMode="middle" numberOfLines={3}>
            <Icon name="whatsapp" size="16" /> {data.whatsapp} {`\n`}
            <Icon name="calendar-alt" size="16" /> {data.subscribeAt}
          </Info>
        </Informacao>
        <Actions>
          <ActionButton onPress={() => createTwoBottonAlert(data._id)}>
            <Icon name="archive" color={theme.colors.text} size="32" />
          </ActionButton>
          <ActionButton
            onPress={() => handlePresWhatsapp(data.whatsapp, data.nome)}
          >
            <Icon name="whatsapp" color={theme.colors.success} size="32" />
          </ActionButton>
        </Actions>
      </View>
      <InfoEmail>
        <Icon name="mail-bulk" size="16" /> {data.email}
      </InfoEmail>
    </Container>
  );
}
