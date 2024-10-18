import Providers from "../context/providers";
import React from "react";
import Image from "next/image";
import "./globals.css";
import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="w-full bg-gray-100">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
