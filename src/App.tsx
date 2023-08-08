import type { FC } from 'react';
import type { RootStackParamList } from 'types/navigation.types';
import { Platform } from 'react-native';
import {
  DEVELOPMENT_URI_ANDROID_BACKEND,
  DEVELOPMENT_URI_IOS_BACKEND,
  PRODUCTION_URI_BACKEND,
} from 'react-native-dotenv';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen, HomeScreen } from './screens';

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const client = new ApolloClient({
  uri: __DEV__
    ? Platform.OS === 'ios'
      ? DEVELOPMENT_URI_IOS_BACKEND
      : DEVELOPMENT_URI_ANDROID_BACKEND
    : PRODUCTION_URI_BACKEND,
  cache: new InMemoryCache(),
});

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Splash"
            component={SplashScreen}
            options={{
              tabBarStyle: {
                display: 'none',
              },
            }}
          />
          <Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarStyle: {
                display: 'none',
              },
            }}
          />
        </Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export { App };
