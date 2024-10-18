"use client"
import React, { useState } from "react";
import styles from "./search.module.css";
import { useAuthContext } from "@/context/authcontext";
import { Kunde } from "@/types/interfaces";

interface SearchProps {
  search: (phrase: string, token: string) => void;
  suchergebnisse: Kunde[]
}

type SearchState = {
  searchphrase: string;
};

const SearchComp: React.FC<SearchProps> = (props: SearchProps) => {
  const [state, setState] = useState<SearchState>({
    searchphrase: ""
  });
  const { token } = useAuthContext();
  const { auth } = useAuthContext(); // Authentifizierungsstatus aus dem globalen Context abrufen

  if (!auth) {
    // Wenn auth false ist, zeige eine 404 Forbidden-Seite an
    return <h1>404 Forbidden</h1>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    

    props.search(state.searchphrase, token);
    console.log(`suche nach ${state.searchphrase} gestartet`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={`${styles.center} text-center`}>
      {/* <Card style={{ width: "400px", borderRadius: "20px" }}>
        <Card.Body>
          <Card.Title className="text-center">Suche</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="search">
              <Form.Control
                type="text"
                name="search"
                value={state.searchphrase}
                onChange={handleChange}
                placeholder="Kundennummer/name eingeben"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="text-center">
              Suche
            </Button>
          </Form>
        </Card.Body>
      </Card> */}
    </div>
  );
};

export default SearchComp;