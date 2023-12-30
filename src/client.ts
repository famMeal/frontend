import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { Platform } from "react-native";
import { setContext } from "@apollo/client/link/context";

import {
  DEVELOPMENT_URI_ANDROID_BACKEND,
  DEVELOPMENT_URI_IOS_BACKEND,
  PRODUCTION_URI_BACKEND,
} from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

const clientUri = __DEV__
  ? Platform.OS === "ios"
    ? DEVELOPMENT_URI_IOS_BACKEND
    : DEVELOPMENT_URI_ANDROID_BACKEND
  : PRODUCTION_URI_BACKEND;

const link = new HttpLink({ uri: clientUri });

const cache = new InMemoryCache({
  typePolicies: {
    Restaurant: {
      fields: {
        meals: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const client = await AsyncStorage.getItem("client");
  const uid = await AsyncStorage.getItem("uid");

  return {
    headers: {
      ...headers,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.",
      "Content-Type": "application/json; charset=utf-8",
      accessToken: accessToken || "",
      client: client || "",
      uid: uid || "",
    },
  };
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, link]),
  cache,
});
