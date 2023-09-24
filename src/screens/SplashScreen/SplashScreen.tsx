import type { FC } from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreenRN from "react-native-splash-screen";
import type { SplashNavigationProps } from "types/navigation.types";

type Props = {
  navigation: SplashNavigationProps;
};

const SplashScreen: FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const navigateToLogin = () => {
      SplashScreenRN.hide();
      navigation.navigate("Login");
    };

    navigateToLogin();
  }, [navigation]);

  return (
    <View className="flex-1 bg-accent items-center justify-center p-0">
      <Text className="text-white">Splash Screen</Text>
    </View>
  );
};

export { SplashScreen };
