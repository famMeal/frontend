import { useNavigation } from "@react-navigation/native";
import Logo from "assets/svgs/logo.svg";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import type { FC } from "react";
import type { EmailSignUpNavigationProps } from "types/navigation.types";

const SignUpScreen: FC = () => {
  const { navigate } = useNavigation<EmailSignUpNavigationProps>();

  const handleOnPressLogin = () => navigate("Login");
  const handleContinueWithEmail = () => navigate("EmailSignUp");

  return (
    <Container>
      <Columns>
        <Typography weigth="bold" colour="accent" type="H3">
          Get started with{" "}
        </Typography>
        <Logo />
        <Typography weigth="bold" colour="accent" type="H3">
          !
        </Typography>
      </Columns>
      <Box>
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
            <Button onPress={() => console.log("sign up")}>
              Continue with Google
            </Button>
          </Column>
        </Columns>
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
            <Button onPress={() => console.log("sign up")}>
              Continue with Apple
            </Button>
          </Column>
        </Columns>
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
            <Button theme="accent" onPress={handleContinueWithEmail}>
              Continue with Email
            </Button>
          </Column>
        </Columns>
        <Columns className="mt-8">
          <Column
            alignItems="flex-end"
            justifyContent="center"
            columnWidth="twoThird">
            <Typography type="S">Already have an account?</Typography>
          </Column>
          <Column columnWidth="oneThird" justifyContent="center">
            <Button
              onPress={handleOnPressLogin}
              theme="accent"
              isOutlined
              isClean>
              Login
            </Button>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { SignUpScreen };
