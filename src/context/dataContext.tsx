"use client";

import useFetch from "@/hooks/useFetch";
import { TransactionTypeData } from "@/types/transactionType";
import { getToken } from "@/utils/cookies";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

type IDataContext = {
  data: TransactionTypeData[] | null;
  loading: boolean;
  error: string | null;
};

const DataContext = React.createContext<IDataContext | null>(null);

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) throw new Error("useData precisa estar em DataContextProvider");
  return context;
};

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const token = getToken();
  const { data, loading, error } = useFetch<TransactionTypeData[]>(
    `${API_URL}/api/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
