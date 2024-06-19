import AsyncStorage from "@react-native-async-storage/async-storage";
import type { FC, PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const client = await AsyncStorage.getItem("client");
      const uid = await AsyncStorage.getItem("uid");

      if (accessToken && client && uid) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
