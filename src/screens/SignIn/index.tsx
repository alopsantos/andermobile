import React, { useContext } from "react";
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
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/gofinance.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";

export function SignIn() {
  const data = useAuth();

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
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />

          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
