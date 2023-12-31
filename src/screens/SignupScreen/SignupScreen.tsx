import { useNavigation } from "@react-navigation/native";
import { Button, Column, Columns, Container, Typography } from "components";
import type { FC } from "react";
import type { SignUpNavigationProps } from "types/navigation.types";

const SignUpScreen: FC = () => {
  const { navigate } = useNavigation<SignUpNavigationProps>();

  const onPressGoBack = () => navigate("Login");
  return (
    <Container>
      <Columns>
        <Column>
          <Button onPress={onPressGoBack}>go back</Button>
        </Column>
      </Columns>
      <Typography>Sign Up</Typography>
    </Container>
  );
};

export { SignUpScreen };
