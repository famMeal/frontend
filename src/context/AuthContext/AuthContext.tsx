import { createContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

AuthContext.displayName = "AuthContext";

export { AuthContext };
