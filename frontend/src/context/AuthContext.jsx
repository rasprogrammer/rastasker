import { createContext, useContext, useMemo, useReducer } from "react";
import { authReducer, INITIAL_STATE } from "@/reducer/authReducer";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const value = useMemo(() => [state, dispatch], [state]);
  console.log('value > ', value);

  return <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>;
}
