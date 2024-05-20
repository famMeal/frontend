import { Container } from "components";
import type { FC } from "react";
import { EmailSignUp } from "./EmailSignUp";

const ClientSignUpTab: FC = () => {
  return (
    <Container>
      <EmailSignUp />
    </Container>
  );
};

export { ClientSignUpTab };
