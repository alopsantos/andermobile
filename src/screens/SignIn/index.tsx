import React, { useCallback, useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useForm } from "react-hook-form";
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
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import { Alert } from "react-native";
import LogoSvg from "../../assets/gofinance.svg";

interface ISignInFormData {
  email: string;
  password: string;
}
const schema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail é obrigatorio!")
    .email("Digite um e-mail válido!"),
  password: Yup.string().required("Sua senha é obrigatório!"),
});

export function SignIn() {
  const data = useAuth();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(200)} />

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
          <InputForm
            name="email"
            placeholder="e-mail"
            control={control}
            autoCapitalize="sentences"
            keyboardType="email-address"
            returnKeyType="next"
            autoCorrect={false}
            error={errors.name}
          />
          <InputForm
            name="password"
            placeholder="Senha"
            secureTextEntry
            returnKeyType="send"
            control={control}
            autoCorrect={false}
            error={errors.name}
          />
          <Button title="Entrar" onPress={() => {}} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
