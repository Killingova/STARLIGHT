import React, { useState, ReactNode } from "react";
import { Product } from "@/types/interfaces";
import { AuthContext } from "./authcontext";
import { AppRouteRouteHandlerContext } from "next/dist/server/future/route-modules/app-route/module";

interface IProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");

  const addToken = (_token: string) => {
    if(_token){
      localStorage.setItem("token", _token);
      setToken(_token);
      setAuth(true);
    }

    console.log("AuthContextProvider - setting Token " + _token);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        token: "",
        addToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
