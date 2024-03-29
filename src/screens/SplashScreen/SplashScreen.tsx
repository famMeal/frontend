import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Logo from "assets/svgs/logo.svg";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Container } from "components/Container";
import React, { useEffect } from "react";
import { View } from "react-native";
import SplashScreenRN from "react-native-splash-screen";
import { useCurrentUserQuery } from "shared";
import type { RootStackParamList } from "types/navigation.types";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const Screens = {
  Restaurants: "Restaurants",
  Clients: "Clients",
  Login: "Login",
} as const;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { navigate } = navigation;
  const { data, loading } = useCurrentUserQuery();

  useEffect(() => {
    if (!loading) {
      SplashScreenRN.hide();

      if (data?.currentUser) {
        const isRestaurant = !!data?.currentUser?.restaurant;
        navigate(isRestaurant ? Screens.Clients : Screens.Clients);
      }
    }
  }, [loading, data, navigation]);

  if (loading) {
    return (
      <Container>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Columns>
            <Column
              alignItems="center"
              columnWidth="fullWidth"
              justifyContent="center">
              <Logo />
            </Column>
          </Columns>
        </View>
      </Container>
    );
  }

  return null;
};

export { SplashScreen };
