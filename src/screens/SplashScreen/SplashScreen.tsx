import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, Loader } from "components";
import React, { useEffect } from "react";
import AppSplashScreenRN from "react-native-splash-screen";
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
      AppSplashScreenRN.hide();

      if (data?.currentUser) {
        const isRestaurant = !!data?.currentUser?.restaurant;
        navigate(isRestaurant ? Screens.Clients : Screens.Clients);
      }
    }
  }, [loading, data, navigation]);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return null;
};

export { SplashScreen };
