"use client";
import { useState, useEffect } from "react";
import { Kunde } from "@/types/interfaces";
import { parse } from "path";
import Kundenliste from "@/components/KundenListe";
import { useServiceContext } from "@/context/servicecontext";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import axios from "axios";

const KundenPage = () => {
  const [customers, setCustomers] = useState<Kunde[]>([]);
  const [recentCustomers, setRecentCustomers] = useState<Kunde[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { setKunde } = useServiceContext();
  const { token } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // Überprüfen, ob Kunden im LocalStorage vorhanden sind und diese zur Kundenliste hinzufügen
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      const parsedCustomers =JSON.parse(storedCustomers); 
      setRecentCustomers(parsedCustomers);
    }

    console.log("Kundenpage token= " + token);
  }, [token]);

  const handleSearch = async () => {
    setSearchActive(true);
    setLoading(true);
    try {
      let data = "";
      const regex = /^\d+$/;

      const storedToken = localStorage.getItem("token");
      console.log("storedTOken: " + storedToken);
      if (
        storedToken !== "undefined" &&
        storedToken !== null &&
        storedToken.length > 0
      ) {
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": "f8skJUkb7LbVrJjuGMv-gGUXWcDf9p",
          //Authorization: "Bearer " + storedToken,
        };

        console.log("header", headers);

        const response = await axios.get(
          `https://qas.freyadv.de/eserviceschein/api/kunde/${searchQuery}`,
          {
            timeout: 10000, // 10 Sekunden Timeout
            headers: headers,
          }
        );

        console.log("abruf kundendaten", response);

        const ku: Kunde = {
          Name: response.data.Kunde,
          Tel: response.data.Telefon,
          Adresse:
            response.data.Straße +
            ", " +
            response.data.plz +
            " " +
            response.data.Ort,
          Mail: response.data.EMail,
          Knr: +response.data.Kundennummer,
        };

        setCustomers([ku]);
      } else {
        console.log("KundenPage no token");
      }

      // const parsedData = {
      //   Name: data.Name,
      //   Tel: data.Tel,
      //   Mail: data.Mail,
      //   Knr: data.Knr,
      //   Adresse: data.Adresse,
      // };

      // if (!customers.find((c) => c.Knr === parsedData.Knr)) {
      //   const updatedCustomers = [...customers, parsedData];
      //   setCustomers(updatedCustomers);

      //   console.log("customers updated", updatedCustomers);
      //   localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      // }
    } catch (error) {
      console.error("Fehler beim Abrufen der Kunden:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectKunde = (customer: Kunde) => {
    console.log("Kunde", customer);
    setKunde(customer);
    router.push("./serviceschein");
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kunde suchen"
          className="mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-quincy-blau1"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-quincy-orange text-bg-quincy-grau1 px-4 py-2 rounded-md"
        >
          {loading ? "Suche läuft..." : "Suchen"}
        </button>
      </div>
      <div className="grid grid-cols-[1fr,2fr,1fr] gap-4 mt-5">
        {customers.length === 0 ? (
          searchActive ? ( <p className="mt-2 text-quincy-blau1 col-start-2 text-center">
          Keine Ergebnisse
        </p>) : (<></>)
        ) : (
          <div className="mt-2 col-start-2">
            <Kundenliste
              customers={customers}
              selectKunde={selectKunde.bind(this)}
            />
          </div>
        )}

        {recentCustomers.length > 0 ? (
          <>
            <div className="col-start-2">
              <h1 className="text-1xl font-bold text-quincy-blau1">
                Zuletzt aufgerufen
              </h1>
            </div>
            <div className="mt-2 col-start-2">
              <Kundenliste
                customers={recentCustomers}
                selectKunde={selectKunde.bind(this)}
              />
            </div>
          </>
        ) : (<></>)}
      </div>
    </>
  );
};

export default KundenPage;
