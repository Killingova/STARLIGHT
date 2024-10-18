import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Kunde } from "@/types/interfaces";
import KundenComp from "./Kunden";

interface KundenProps {}

const getKunde = async (knr: string): Promise<Kunde> => {
  try {
    console.log("get kunde");
    const response = await axios.get("http://10.0.2.96:3001/kunden/" + knr);
    const kunde: Kunde = response.data;
    return kunde;
  } catch (error) {
    throw new Error("Failed to fetch data: " + error);
  }
};

const KundenPage = ({ }: KundenProps) => {
  const urlParams = useSearchParams();
  const knr = urlParams.get("kundennummer");

  if (!knr) {
    return (
      <div>
        <h1>Neuen Kunden anlegen</h1>
      </div>
    );
  }

  const fetchKunde = async () => {
    try {
      const temp = await getKunde(knr);
      return temp;
    } catch (error) {
      console.log("Error fetching kunde:", error);
      return null;
    }
  };

  const kunde = fetchKunde();

  if (!kunde) {
    // Handle loading or error state here
    return <div>Loading...</div>;
  }

  let BRUUH : Kunde = {
    Name:'BRUH',
    Mail:'Jo',
    Adresse: 'Hier und Da',
    Knr:123,
    Tel:'345435'

  }

  return (
    <div>
      <KundenComp kunde={BRUUH} />
    </div>
  );
};

export default KundenPage;
