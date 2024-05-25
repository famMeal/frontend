import { Container } from "components";
import type { FC } from "react";
import { ClientEmailSignUp } from "./ClientEmailSignUp";

const ClientSignUpTab: FC = () => {
  return (
    <Container>
      <ClientEmailSignUp />
    </Container>
  );
};

export { ClientSignUpTab };
