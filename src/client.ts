import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Platform } from "react-native";
import {
  DEVELOPMENT_URI_ANDROID_BACKEND,
  DEVELOPMENT_URI_IOS_BACKEND,
  PRODUCTION_URI_BACKEND,
} from "react-native-dotenv";

const uri = __DEV__
  ? Platform.OS === "ios"
    ? DEVELOPMENT_URI_IOS_BACKEND
    : DEVELOPMENT_URI_ANDROID_BACKEND
  : PRODUCTION_URI_BACKEND;

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

export const client = new ApolloClient({
  uri,
  cache,
});
