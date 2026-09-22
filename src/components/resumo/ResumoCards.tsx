"use client";

import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ReceiptText,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useResumo } from "@/context/resumoContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { LoadingSkeleton } from "@/utils/loadingSkeleton";
import SummaryCard from "./SummaryCard";
import CategoriasCard from "./CategoriasCard";

export default function ResumoCards() {
  const { resumo, loading, error } = useResumo();

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="box text-expense text-sm flex items-center gap-2">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <span>Erro ao carregar resumo: {error}</span>
      </div>
    );
  }

  if (!resumo) return null;

  const { totais } = resumo;
  const diasComReceita = resumo.evolucaoDiaria.filter(
    (d) => d.receitas > 0,
  ).length;
  const diasComDespesa = resumo.evolucaoDiaria.filter(
    (d) => d.despesas > 0,
  ).length;

  return (
    <div className="flex flex-col gap-[var(--gap)]">
      {/* Cards principais */}
      <div className="flex flex-wrap gap-[var(--gap)]">
        <SummaryCard
          label="Receitas"
          display={formatCurrency(totais.receitas)}
          colorClass="text-income"
          icon={<TrendingUp className="w-5 h-5 text-income" />}
          iconBgClass="bg-green-50"
          sub={`${diasComReceita} dia(s) com receitas`}
        />
        <SummaryCard
          label="Despesas"
          display={formatCurrency(totais.despesas)}
          colorClass="text-expense"
          icon={<TrendingDown className="w-5 h-5 text-expense" />}
          iconBgClass="bg-red-50"
          sub={`${diasComDespesa} dia(s) com despesas`}
        />
        <SummaryCard
          label="Saldo"
          display={formatCurrency(totais.saldo)}
          colorClass={totais.saldo >= 0 ? "text-income" : "text-expense"}
          icon={
            <Wallet
              className={`w-5 h-5 ${
                totais.saldo >= 0 ? "text-income" : "text-expense"
              }`}
            />
          }
          iconBgClass={totais.saldo >= 0 ? "bg-green-50" : "bg-red-50"}
          sub="Receitas − Despesas"
        />
        <SummaryCard
          label="Transações"
          display={String(totais.totalTransacoes)}
          colorClass="text-primary"
          icon={<ReceiptText className="w-5 h-5 text-primary" />}
          iconBgClass="bg-blue-50"
          sub="no período selecionado"
        />
      </div>

      {/* Badges de status (Pago / Pendente) */}
      <div className="flex flex-wrap gap-[var(--gap-s)]">
        <div className="box flex items-center gap-2 py-2 px-4">
          <CheckCircle2 className="w-4 h-4 text-income flex-shrink-0" />
          <span className="text-sm text-gray-600">Pago:</span>
          <span className="text-sm font-semibold text-income tabular-nums">
            {formatCurrency(totais.pago)}
          </span>
        </div>
        <div className="box flex items-center gap-2 py-2 px-4">
          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span className="text-sm text-gray-600">Pendente:</span>
          <span className="text-sm font-semibold text-amber-600 tabular-nums">
            {formatCurrency(totais.pendente)}
          </span>
        </div>
      </div>

      {/* Categorias */}
      <CategoriasCard />
    </div>
  );
}
