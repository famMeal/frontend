import type { FC } from "react";
import type { LoginNavigationProps } from "types/navigation.types";
import { useState } from "react";
import {
  Columns,
  Container,
  Column,
  Typography,
  Box,
  Input,
  Button,
} from "components";
import { useNavigation } from "@react-navigation/native";

const LoginScreen: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = useNavigation<LoginNavigationProps>();

  const handleOnPressLogin = () => navigate("Home");

  return (
    <Container>
      <Box>
        <Columns isMarginless>
          <Column className="items-center justify-center">
            <Typography colour="accent" isMarginless weigth="bold" type="H1">
              FamMeal
            </Typography>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column>
            <Typography weigth="semiBold" type="S">
              Email
            </Typography>
            <Input theme="accent" />
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column>
            <Typography weigth="semiBold" type="S">
              Password
            </Typography>
            <Input theme="accent" />
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Button onPress={handleOnPressLogin}>Login</Button>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { LoginScreen };
