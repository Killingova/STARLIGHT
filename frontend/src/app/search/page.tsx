import { useAuthContext } from "@/context/authcontext";
import SearchComp from "./Search";
import React, { useContext } from "react";
import { AuthContext } from "@/context/authcontext";
import { Kunde } from "@/types/interfaces";

async function onSearch(searchphrase: string, token: string) : Promise<Kunde[]> {
  let ergebnisse : Kunde[] = [];
  try {
    const axios = require("axios");
    

    const data = {
      search: searchphrase,
    };
    console.log(
      "lets go = http://localhodtz:3001/api/v1/search?" + searchphrase
    ); // Die Antwortdaten

    const header = {
      // Content-Type gibt an, wie der Inhalt der Anfrage formatiert ist
      "Content-Type": "application/json",
      // Authorization gibt an, ob die Anfrage authentifiziert ist
      // Hier verwenden wir ein fiktives Token als Beispiel
      // Authorization:
      "Access-Control-Allow-Origin": "*",
      Bearer: token,
    };

    const res = await axios.get(
      "http://10.0.2.96:3001/api/v1/search?" + searchphrase,
      data,
      {
        timeout: 10000, // 10 Sekunden Timeout
        header: header
      }
    );
    console.log("onSearch", res.data); // Die Antwortdaten

    ergebnisse = res.data.map((k : Kunde) =>({
      knr: k.Knr,
      name: k.Name,
      Adresse: k.Adresse,
      Tel: k.Tel,
      Mail: k.Mail,
    }));

    return ergebnisse;
  } catch (error) {
    console.log("error: ", error);
  }
  return ergebnisse;
}

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  // const { auth } = useAuthContext(); // Authentifizierungsstatus aus dem globalen Context abrufen
  let suchergebnisse : Kunde[] = []

  // if (!auth) {
  //   // Wenn auth false ist, zeige eine 404 Forbidden-Seite an
  //   return <h1>404 Forbidden</h1>;
  // }

  async function handleSearch(phrase: string, token: string) {
    try {
      console.log("search start");
      suchergebnisse = await onSearch(phrase, token);
    } catch (error) {
      console.log("handleSearch", error);
    }
  }

  return (
    <>
      <SearchComp search={handleSearch} suchergebnisse={suchergebnisse}/>
    </>
  );
};

export default Search;
