import React, {useState, ReactNode} from "react";
import { Product } from "@/types/interfaces";
import { ServiceContext } from "./servicecontext";
import { Kunde } from "@/types/interfaces";

interface IProps {
    children: ReactNode;
}

const ServiceContextProvider = ({children} : IProps) => {
    const [products, setProducts]= useState<Product[]>([])
    const [kunde, setCurrentKunde] = useState<Kunde>({ Name: '', Tel: '', Mail: '', Knr: 0, Adresse: ''})

    const addProduct=(product: Product)=> {
        product.id = products.length;
        setProducts([...products, product]);
    }

    const setKunde=(customer: Kunde)=> {
        console.log("Kunde wird nun im ServiceContextProvider gesetzt.")
        setCurrentKunde(prevKunde => ({ ...prevKunde, ...customer }));
    }

    return (
    <ServiceContext.Provider value={{
        kunde,
        products,
        addProduct,
        setKunde
    }}>
        {children}
    </ServiceContext.Provider>)
}

export default ServiceContextProvider;