import type { FC } from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import SplashScreenRN from 'react-native-splash-screen';
import { SplashNavigationProps } from 'types/navigation.types';

type Props = {
  navigation: SplashNavigationProps;
};

const SplashScreen: FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const navigateToHome = async () => {
      SplashScreenRN.hide();
      navigation.navigate('Home');
    };

    navigateToHome();
  }, []);

  return (
    <View className="flex-1 bg-accent items-center justify-center p-0">
      <Text className="text-white">Splash Screen</Text>
    </View>
  );
};

export { SplashScreen };
