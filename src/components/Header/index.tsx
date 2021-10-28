import React from "react";

import { Container, Title } from "./styles";

interface IHeaderLayout {
  title: string;
}
export function HeaderLayout({title}:IHeaderLayout) {
  return (
    <Container>
        <Title>{title}</Title>
    </Container>
  );
}
