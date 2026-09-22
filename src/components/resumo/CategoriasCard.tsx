"use client";

import { PieChart } from "lucide-react";
import { useResumo } from "@/context/resumoContext";
import { formatCurrency } from "@/utils/formatCurrency";

export default function CategoriasCard() {
  const { resumo } = useResumo();
  if (!resumo || resumo.porCategoria.length === 0) return null;

  const total = resumo.porCategoria.reduce((acc, c) => acc + c.total, 0);

  return (
    <div className="box flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <PieChart className="w-4 h-4 text-gray-500" />
        <h2 className="text-base font-semibold">Por Categoria</h2>
      </div>
      <ul className="flex flex-col gap-3">
        {[...resumo.porCategoria]
          .sort((a, b) => b.total - a.total)
          .map((cat) => {
            const pct = total > 0 ? Math.round((cat.total / total) * 100) : 0;
            return (
              <li key={cat.id} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: cat.color ?? "#2563eb" }}
                    />
                    <span className="truncate max-w-[160px]">{cat.nome}</span>
                  </span>
                  <span className="font-semibold tabular-nums">
                    {formatCurrency(cat.total)}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-light-blue overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: cat.color ?? "#2563eb",
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 text-right">{pct}%</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
