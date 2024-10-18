"use client";

import { createContext, useContext  } from 'react';
import { Product } from '@/types/interfaces';
import { Kunde } from '@/types/interfaces';

export interface IServiceContext {
  kunde: Kunde,
  products: Product[],
  addProduct:(product: Product) => void
  setKunde:(kunde: Kunde) => void
}

export const ServiceContext = createContext<IServiceContext>({
  kunde: {
    Knr: 0,
    Name:'',
    Mail:'',
    Tel:'',
    Adresse:'',
  },
  products: [],
  addProduct(product) {},
  setKunde(kunde) {}
});

export const useServiceContext = () =>  useContext(ServiceContext);
