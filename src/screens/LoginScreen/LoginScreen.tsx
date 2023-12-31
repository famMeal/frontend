import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Input,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import type { LoginNavigationProps } from "types/navigation.types";
import { useLoginMutation } from "./useLogInMutation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Screens = {
  Restaurants: "Restaurants",
  Clients: "Clients",
} as const;

const LoginScreen: FC = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation<LoginNavigationProps>();
  const [userLogin] = useLoginMutation({
    onCompleted: completedData => {
      AsyncStorage.setItem(
        "accessToken",
        completedData.userLogin.credentials.accessToken,
      );
      AsyncStorage.setItem(
        "client",
        completedData.userLogin.credentials.client,
      );
      AsyncStorage.setItem("uid", completedData.userLogin.credentials.uid);
      navigate(Screens.Clients);
    },
    onError: error => {
      console.error("Login error:", error.message);
    },
  });

  const handleOnPressLogin = () => {
    userLogin({
      variables: {
        email,
        password,
      },
    });
  };

  const toggleSecureTextEntry = () =>
    setSecureTextEntry(prevState => !prevState);

  const renderEyeIcon = () =>
    secureTextEntry ? (
      <EyeSlashIcon color={COLOURS.accent} />
    ) : (
      <EyeIcon color={COLOURS.accent} />
    );

  return (
    <Container className="mx-4">
      <Columns>
        <Column alignItems="center" columnWidth="fullWidth">
          <Typography colour="accent" isMarginless weigth="bold" type="H1">
            Batch
          </Typography>
        </Column>
      </Columns>
      <Box>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Email
            </Typography>
            <Input
              keyboardType="email-address"
              onChangeText={newText => setEmail(newText)}
              value={email}
              theme="accent"
            />
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Password
            </Typography>
            <Input
              className="relative"
              secureTextEntry={secureTextEntry}
              onChangeText={newText => setPassword(newText)}
              value={password}
              theme="accent"
            />
            <View className="absolute right-2 top-11">
              <Column>
                <TouchableOpacity onPress={toggleSecureTextEntry}>
                  {renderEyeIcon()}
                </TouchableOpacity>
              </Column>
            </View>
          </Column>
        </Columns>
        <Columns isMarginless className="mt-4">
          <Column columnWidth="fullWidth">
            <Button onPress={handleOnPressLogin}>Login</Button>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { LoginScreen };
