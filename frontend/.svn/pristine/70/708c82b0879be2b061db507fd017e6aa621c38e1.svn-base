"use client";
import React from "react";
import ServiceContextProvider from "./ServiceContextProvider";
import AuthContextProvider from "./AuthContextProvider";
import { ChildrenProps } from "@/types/global";

// Sammelstelle für ContextProvider
export default function Providers({ children }: ChildrenProps) {
  return (
    <ServiceContextProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ServiceContextProvider>
  );
}
