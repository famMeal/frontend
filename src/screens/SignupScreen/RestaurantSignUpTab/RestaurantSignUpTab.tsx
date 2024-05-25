import { Container } from "components";
import type { FC } from "react";
import { RestaurantEmailSignUp } from "./RestaurantEmailSignUp";

const RestaurantSignUpTab: FC = () => {
  return (
    <Container>
      <RestaurantEmailSignUp />
    </Container>
  );
};

export { RestaurantSignUpTab };
