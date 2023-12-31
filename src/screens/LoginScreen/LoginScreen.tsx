import AsyncStorage from "@react-native-async-storage/async-storage";
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

const Screens = {
  Restaurants: "Restaurants",
  Clients: "Clients",
  SignUp: "SignUp",
} as const;

const LoginScreen: FC = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("shahynkamali@gmail.com");
  const [password, setPassword] = useState("password");
  const { navigate } = useNavigation<LoginNavigationProps>();
  const [userLogin, { loading }] = useLoginMutation({
    onCompleted: ({ userLogin }) => {
      AsyncStorage.setItem("accessToken", userLogin.credentials.accessToken);
      AsyncStorage.setItem("client", userLogin.credentials.client);
      AsyncStorage.setItem("uid", userLogin.credentials.uid);
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
      onCompleted: () => navigate(Screens.Clients),
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

  const handleOnSignUpPress = () => navigate(Screens.SignUp);

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
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
            <Button isLoading={loading} onPress={handleOnPressLogin}>
              Login
            </Button>
          </Column>
        </Columns>
        <Columns className="mt-8">
          <Column
            alignItems="flex-end"
            justifyContent="center"
            columnWidth="twoThird">
            <Typography type="S">Dont have an account?</Typography>
          </Column>
          <Column columnWidth="oneThird" justifyContent="center">
            <Button
              onPress={handleOnSignUpPress}
              theme="accent"
              isOutlined
              isClean>
              Sign Up
            </Button>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { LoginScreen };
