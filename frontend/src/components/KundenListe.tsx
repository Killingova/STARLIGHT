"use client"
import React from 'react';
import { Kunde } from '@/types/interfaces';


interface KundenlisteProps {
    customers: Kunde[];
    selectKunde: (customer: Kunde) => void;
  }

  const Kundenliste: React.FC<KundenlisteProps> = ({ customers, selectKunde }) => {

    console.log("Kundenliste - Anzahl: " + customers.length);

    return (
      <div className='grid grid-cols-1 gap-4'>
        {customers.map((customer) => (
          <div
            key={customer.Knr}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => selectKunde(customer)}
          >
            <h3 className="text-lg font-semibold text-quincy-blau1">{customer.Name}</h3>
            <p className="text-gray-500">{customer.Adresse}</p>
            <p className="text-gray-500">{customer.Tel}</p>
            <p className="text-gray-500">{customer.Mail}</p>
            <p className="text-gray-500">Kundennummer: {customer.Knr}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Kundenliste;