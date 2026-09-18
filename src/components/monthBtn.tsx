"use client";

import { useData } from "@/context/dataContext";
import { getNameMonth } from "@/utils/getNameMonth";
import { setMonth } from "@/utils/setMonth";

export default function MonthBtn({ n }: { n: number }) {
  const { setInicio, setFinal } = useData();

  return (
    <button
      onClick={() => setMonth(n, setInicio, setFinal)}
      className="px-5 py-2 bg-primary text-white font-semibold text-sm capitalize rounded-xl shadow-xs hover:brightness-110 active:scale-95 transition-all border-none"
    >
      {getNameMonth(n)}
    </button>
  );
}
