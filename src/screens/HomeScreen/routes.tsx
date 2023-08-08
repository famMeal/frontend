import type { Dispatch, SetStateAction } from 'react';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from 'types/navigation.types';
import { MainScreen } from 'screens/HomeScreen/MainScreen';
import { ConfirmationScreen } from 'screens/HomeScreen/ConfirmationScreen';
import { ProfileScreen } from 'screens/HomeScreen/ProfileScreen';
import { OrdersScreen } from 'screens/HomeScreen/OrdersScreen';

export interface HomeRouteProps<T extends keyof RootStackParamList> {
  route: RouteProp<RootStackParamList, T>;
  navigation: any;
}

type HomeRoutes = HomeRouteProps<
  'Main' | 'Confirmation' | 'Profile' | 'Orders'
>;

const homeRoutes = (setActiveScreen: Dispatch<SetStateAction<string>>) =>
  [
    {
      name: 'Main',
      iconName: 'archive',
      tabBarLabel: 'Meals',
      renderComponent: (props: HomeRoutes) => (
        <MainScreen
          setActiveScreen={setActiveScreen}
          {...(props as HomeRouteProps<'Main'>)}
        />
      ),
    },
    {
      name: 'Confirmation',
      iconName: 'badge',
      tabBarLabel: 'Confirmation',
      renderComponent: (props: HomeRoutes) => (
        <ConfirmationScreen
          setActiveScreen={setActiveScreen}
          {...(props as HomeRouteProps<'Confirmation'>)}
        />
      ),
    },
    {
      name: 'Orders',
      iconName: 'shopping',
      tabBarLabel: 'Orders',
      renderComponent: (props: HomeRoutes) => (
        <OrdersScreen
          setActiveScreen={setActiveScreen}
          {...(props as HomeRouteProps<'Orders'>)}
        />
      ),
    },
    {
      name: 'Profile',
      iconName: 'user',
      tabBarLabel: 'Profile',
      renderComponent: (props: HomeRoutes) => (
        <ProfileScreen
          setActiveScreen={setActiveScreen}
          {...(props as HomeRouteProps<'Profile'>)}
        />
      ),
    },
  ] as const;

export { homeRoutes };
