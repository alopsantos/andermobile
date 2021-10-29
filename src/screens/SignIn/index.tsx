import React, { useCallback, useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import { useAuth } from "../../hooks/auth";
import LogoSvg from "../../assets/gofinance.svg";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
interface ISignInFormData {
  email: string;
  password: string;
}

export function SignIn() {
  const data = useAuth();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const handleSignIn = useCallback((
    async (data: ISignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        })
      } catch (error) {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer o login, cheque as credenciais."
        )
      }
    }
  ), [SignIn])
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg with={RFValue(120)} height={RFValue(200)} />

          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simplees{"\n"}
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo {"\n"}
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <Input
            name="email"
            control={control}
            placeholder="E-mail"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <Input
            name="password"
            control={control}
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry
          />
          <Button title="Entrar" onPress={() => {}} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
