"use client";

import useFetch from "@/hooks/useFetch";
import { ResumoData } from "@/types/resumoType";
import { getToken } from "@/utils/cookies";
import React from "react";
import { useData } from "./dataContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

type IResumoContext = {
  resumo: ResumoData | null;
  loading: boolean;
  error: string | null;
};

const ResumoContext = React.createContext<IResumoContext | null>(null);

export const useResumo = () => {
  const context = React.useContext(ResumoContext);
  if (!context)
    throw new Error("useResumo precisa estar em ResumoContextProvider");
  return context;
};

export const ResumoContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const token = getToken();
  const { inicio, final } = useData();

  const { data: resumo, loading, error } = useFetch<ResumoData>(
    `${API_URL}/api/transactions/summary?startDate=${inicio}&endDate=${final}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return (
    <ResumoContext.Provider value={{ resumo, loading, error }}>
      {children}
    </ResumoContext.Provider>
  );
};
