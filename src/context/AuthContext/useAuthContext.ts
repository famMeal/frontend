import { useContext } from "react";
import type { AuthContextType } from "./AuthContext";
import { AuthContext } from "./AuthContext";

const useAuthContext = () => useContext<AuthContextType | null>(AuthContext);

export { useAuthContext };
