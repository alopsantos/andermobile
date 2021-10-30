import React, { useCallback, useContext } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Yup from "yup";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  Form,
} from "./styles";
import { useAuth } from "../../hooks/auth";
import LogoSvg from "../../assets/gofinance.svg";
import { Button } from "../../components/Form/Button";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { InputForm } from "../../components/Form/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
interface ISignInFormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail obrigatorio")
    .email("Digite um e-email válido"),
  password: Yup.string().required("Sua senha é obrigatorio"),
});
export function SignIn() {
  const data = useAuth();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({resolver: yupResolver(schema)});

  const handleSignIn = useCallback(
    async (data: ISignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer o login, cheque as credenciais."
        );
      }
    },
    [SignIn]
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <Form>
            <InputForm
              name="email"
              control={control}
              placeholder="E-mail"
              autoCorrect={false}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.password && errors.password.message}
            />
            <InputForm
              name="password"
              control={control}
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <Button title="Entrar" onPress={handleSubmit(handleSignIn)} />
          </Form>
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
