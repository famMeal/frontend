import type { FC } from 'react';
import type { RootStackParamList } from 'types/navigation.types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createScreenOptions } from 'utilities';
import { homeRoutes } from './routes';
import { COLOURS } from 'constants/colours';
import { View } from 'react-native';
import { iconMap } from 'utilities/createScreenOptions';

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const HomeScreen: FC = () => {
  const [activeScreen, setActiveScreen] = useState('');
  const navigation = useNavigation();
  const homeScreens = useMemo(() => homeRoutes(setActiveScreen), []);

  useFocusEffect(
    useCallback(() => {
      const { name } =
        navigation.getState().routes[navigation.getState().index];

      setActiveScreen(name);
    }, [navigation]),
  );

  const getOptions = (tabBarLabel: string, name: string, iconName: string) =>
    createScreenOptions({
      headerShown: activeScreen !== 'Main',
      headerTitleStyle: {
        color: COLOURS.white,
        fontFamily: 'Khula-Bold',
        fontSize: 18,
      },
      tabBarLabel,
      isScreenActive: activeScreen === name,
      iconName: iconName as keyof typeof iconMap,
      headerBackground: () => (
        <View className="bg-accent w-full h-full relative flex justify-end items-center" />
      ),
    });

  const renderScreen = ({
    name,
    tabBarLabel,
    iconName,
    renderComponent,
    ...rest
  }: (typeof homeScreens)[number]) => (
    <Screen
      key={name}
      name={name}
      options={getOptions(tabBarLabel, name, iconName)}
      {...rest}>
      {renderComponent}
    </Screen>
  );

  const renderScreens = useCallback(
    () => homeScreens.map(renderScreen),
    [activeScreen],
  );

  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLOURS.light,
        },
      }}>
      {renderScreens()}
    </Navigator>
  );
};

export { HomeScreen };
