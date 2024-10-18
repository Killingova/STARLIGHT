"use client";

import { createContext, useContext  } from 'react';

interface IAuthContext {
  auth: boolean,
  token: string,
  addToken: (token : string) => void
}

export const AuthContext = createContext<IAuthContext>({
  auth : false,
  token:"",
  addToken(token) {}
});

export const useAuthContext = () =>  useContext(AuthContext);