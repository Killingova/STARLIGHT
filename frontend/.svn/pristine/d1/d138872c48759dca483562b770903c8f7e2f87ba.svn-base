"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authcontext";
import dynamic from "next/dynamic";
import { AuthContext } from "@/context/authcontext";
import "./globals.css";
import { Kunde } from "@/types/interfaces";

// Define the props type for the Login component
type LoginProps = {};

// Define the local state
type LoginState = {
  username: string;
  password: string;
};

const Login = (props: LoginProps) => {
  // Initialize the state with empty strings
  const [state, setState] = useState<LoginState>({
    username: "",
    password: "",
  });

  const { addToken } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("getting token: " + storedToken);
    addToken(storedToken!);

    //TESTKUNDEN
    const k1: Kunde = {
      Name: "Hagen S.",
      Tel: "04893/234982348",
      Mail: "Hagen@Praxis.de",
      Knr: 44019,
      Adresse: "No de Halloh 8a, 25591 Ottenbüttel",
    };

    const k2: Kunde = {
      Name: "Sabrina H.",
      Tel: "04893/23348",
      Mail: "Sabrina@Praxis.de",
      Knr: 33019,
      Adresse: "Dorfstr. 8a, 25591 Hagen",
    };

    // Überprüfen, ob Kunden im LocalStorage vorhanden sind und diese zur Kundenliste hinzufügen
    const storedCustomers = localStorage.getItem("customers");
    let customers: Kunde[] = [];
    customers = storedCustomers ? JSON.parse(storedCustomers) : [];

    console.log("recent customers: " + customers.length);

    if (!customers.find((c) => c.Knr === k1.Knr)) {
      customers.push(k1);
    }
    if (!customers.find((c) => c.Knr === k2.Knr)) {
      customers.push(k2);
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    if (
      storedToken !== "undefined" &&
      storedToken !== null &&
      storedToken.length > 0
    ) {
      router.push("/kunden");
    } else {
      console.log("no token in local storage");
    }
  }, []);

  // Handle the input change events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const axios = require("axios");

    const header = {
      // Content-Type gibt an, wie der Inhalt der Anfrage formatiert ist
      "Content-Type": "application/json",
      // Authorization gibt an, ob die Anfrage authentifiziert ist
      // Hier verwenden wir ein fiktives Token als Beispiel
      // Authorization:
      "Access-Control-Allow-Origin": "*",
    };

    const data = JSON.stringify({
      username: state.username,
      password: state.password,
    });

    const response = await axios.post(
      "http://10.0.3.249:3001/api/v1/login",
      data,
      {
        timeout: 10000, // 10 Sekunden Timeout
        headers: header,
      }
    );

    if (response) {
      console.log("response (set Token)", response.data.token);
      addToken(response.data.token);
      router.push("/kunden");
    } else {
      console.log("no token");
    }
  };

  // Handle the form submit event
  // async function handleSubmit1 = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   await onLogin(state.username, state.password);
  // };

  return (
    <div className="grid grid-row-[1fr, 5fr]">
      <div className="mt-12"> 
        <h1 className="text-center text-black text-3xl h-1/3">
          eServiceschein
        </h1>
      </div>

      <div className="row-start-2 w-1/3 mx-auto mt-28">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-center text-black text-lg">Login</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <input
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full text px-3 py-2 placeholder-white  bg-quincy-grau1 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 placeholder-white py-2 bg-quincy-grau1 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-quincy-orange text-white py-2 px-4 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
