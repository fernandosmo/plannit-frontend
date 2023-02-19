import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loginData, setLoginData] = useState();
  const [signed, setSigned] = useState(false);
  const [obras, setObras] = useState("");

  return (
    <AuthContext.Provider
      value={{
        signed,
        setSigned,
        loginData,
        setLoginData,
        obras,
        setObras,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
