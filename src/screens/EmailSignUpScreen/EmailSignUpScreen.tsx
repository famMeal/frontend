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
import { useState, type FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import type { SignUpNavigationProps } from "types/navigation.types";

const EmailSignUpScreen: FC = () => {
  const { navigate } = useNavigation<SignUpNavigationProps>();
  const [email, setEmail] = useState("shahynkamali@gmail.com");
  const [password, setPassword] = useState("password");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () =>
    setSecureTextEntry(prevState => !prevState);

  const renderEyeIcon = () =>
    secureTextEntry ? (
      <EyeSlashIcon color={COLOURS.accent} />
    ) : (
      <EyeIcon color={COLOURS.accent} />
    );

  const handleOnPressLogin = () => navigate("Login");
  return (
    <Container>
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
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Confirm password
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
            <Button onPress={() => console.log("sign up")}>Sign up</Button>
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

export { EmailSignUpScreen };
