import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { type FC } from "react";
import type { SignUpNavigationProps } from "types/navigation.types";

const ConfirmationEmailSentScreen: FC = () => {
  const { navigate } = useNavigation<SignUpNavigationProps>();

  const handleOnPressLogin = () => navigate("Login");
  return (
    <Container className="mx-4">
      <Box>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Check your email to confirm your batch account!
            </Typography>
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

export { ConfirmationEmailSentScreen };
