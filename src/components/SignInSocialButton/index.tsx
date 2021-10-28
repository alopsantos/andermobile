import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, ImagemContainer, Title } from "./styles";

interface IProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}
export function SignInSocialButton({ title, svg: Svg, ...rest }: IProps) {
  return (
    <Button {...rest}>
      <ImagemContainer>
        <Svg />
      </ImagemContainer>

      <Title>{title}</Title>
    </Button>
  );
}
