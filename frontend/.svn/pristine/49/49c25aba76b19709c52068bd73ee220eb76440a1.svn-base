"use client";

import axios from "axios";

// Typ für die Antwort
type LoginResponse = {
  token: string,
  msg : string
};

export async function onLogin(username: string, password: string) {
  try {
    console.log("lets go1");
    // Die Typen für die Daten und die Antwort angeben
    const axios = require("axios");

    const data = {
      username: "username",
      password: "password",
    };
    console.log("lets go2"); // Die Antwortdaten
    const res = await axios.post("http://10.0.2.96:3001/api/v1/login", data, {
      timeout: 10000, // 10 Sekunden Timeout
    });
    console.log("onlogin: " + res.data); // Die Antwortdaten
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("timeout"); // Die Timeout-Nachricht
    } else {
      console.log("error: ", error);
    }
  }
}
