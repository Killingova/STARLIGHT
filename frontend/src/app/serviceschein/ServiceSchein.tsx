"use client";

import React, { useState, useEffect } from "react";
import { Kunde } from "@/types/interfaces";
import { useServiceContext, IServiceContext } from "@/context/servicecontext";
import { Product } from "@/types/interfaces";

interface FormularProps {}

const ServiceSchein: React.FC<FormularProps> = ({}) => {
  const { kunde }: Pick<IServiceContext, "kunde"> = useServiceContext();
  const {
    products,
    addProduct,
  }: Pick<IServiceContext, "products" | "addProduct"> = useServiceContext();

  const comboDummies = ["Test1", "Test2", "Test3"];

  const [data, setData] = useState([
    {
      field: "",
      combo: "Test",
    },
  ]);

  useEffect(() => {

    console.log("products count " + products.length);
    if (products.length == 0) {
      const p1: Product = {
        description: "Lorem ipsum dolor sit amet.",
        name: "Lorem, ipsum.",
        price: 16.99,
        id: 12345,
      };

      const p2: Product = {
        description:
          "schwenkbare retro Stehleuchte - 3x E27 Fassung - ohne Leuchtmittel - 166cm Höhe - schwarz gold",
        name: "B.K.Licht - Stehlampe",
        price: 46.99,
        id: 345546,
      };

      products.push(p1, p2);
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleAddField = () => {
    setData((prevData) => [
      ...prevData,
      {
        field: "",
        combo: "Test",
      },
    ]);
  };

  const handleSend = () => {};

  const handleSave = () => {};

  const handleCancel = () => {};

  const handleBackClick = () => {};

  const MyFormData = () => (
    <div className="flex-1 p-1 items-center">
      {products.map((item, index) => (
        <div
          className="grid grid-cols-[6fr,1fr,1fr] grid-rows-[min-content, min-content] mb-1 border-1 shadow-md rounded-md bg-white h-20"
          key={index}
        >
          <label className="p-2">{item.name}</label>
          <p className="row-start-2 p-2">{item.description}</p>
          <p className="col-start-2 row-span-2 p-2">{item.price}</p>
          <div className="b-1 border-b-gray-200 p-2"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-[1fr,5fr,1fr] gap-4 mt-5 bg-gray-100">
        <h3 className="text-lg text-quincy-blau1 text-center col-span-3 row-start-1 mb-1">
          für{" "}
          <span className="inline text-lg text-quincy-blau1 text-center">
            {kunde.Name}
          </span>
        </h3>
        <div className="bg-white rounded-lg p-6 shadow-lg row-start-2 col-start-2">
          <div className="mb-1">
            <input
              type="text"
              placeholder="Bezeichnung"
              className="w-full p-1 border-2 border-gray-200 rounded-md focus:b-bg-yellow-400 resize-y"
            />
          </div>
          <div className="mb-1">
            <textarea
              placeholder="Beschreibung"
              className="w-full p-1 border-2 border-gray-200 rounded-md bg-white resize-y"
              rows={3}
            ></textarea>
          </div>
          <div className="flex justify-between">
          <button className="w-fit bg-quincy-orange text-white py-2 px-4 rounded-md">
            Hinzufügen
          </button>
            
          </div>
        </div>
        <div className="block row-start-3 col-start-2">
          <MyFormData />
          <button className="w-fit bg-quincy-orange text-white py-2 px-4 rounded-md ml-1">
            Versenden
          </button>
          <button className="w-fit bg-quincy-orange text-white py-2 px-4 rounded-md ml-2">
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSchein;
