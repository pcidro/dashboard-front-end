"use client";

import { useState, useEffect } from "react";
import { getToken } from "@/utils/cookies";
import { apiClient } from "@/utils/apiclient";
import { CreateTransactionAction } from "@/actions/transaction/createtransactionAction";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTransactionModal({
  isOpen,
  onClose,
}: TransactionModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("PENDENTE");
  const [paymentMethod, setPaymentMethod] = useState("PIX");
  const [type, setType] = useState("DESPESA");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    if (!isOpen) return;

    async function loadCategories() {
      try {
        const token = getToken();
        const data = await apiClient<{ id: string; name: string }[]>(
          "/api/categories",
          { token },
        );

        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0 && !categoryId) {
            setCategoryId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }

    loadCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      date,
      description,
      status,
      paymentMethod,
      type,
      amount: Number(amount),
      categoryId,
    };
    try {
      await CreateTransactionAction(body);
      onClose();
    } catch (error) {
      console.log("erro ao criar transação", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Criar transação
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-slate-400 transition hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Descrição
            </label>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Mercado"
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Valor</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="R$ 0,00"
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Data</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Categoria
            </label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-700"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-700"
            >
              <option value="PENDENTE">Pendente</option>
              <option value="PAGO">Pago</option>
              <option value="ATRASADO">Atrasado</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Forma de Pagamento
            </label>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-700"
            >
              <option value="PIX">Pix</option>
              <option value="DINHEIRO">Dinheiro</option>
              <option value="CARTAO_DEBITO">Cartão de Débito</option>
              <option value="CARTAO_CREDITO">Cartão de Crédito</option>
              <option value="TRANSFERENCIA_BANCARIA">
                Transferência Bancária
              </option>
              <option value="BOLETO">Boleto</option>
              <option value="OUTRO">Outro</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Tipo</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-700"
            >
              <option value="RECEITA">Receita</option>
              <option value="DESPESA">Despesa</option>
            </select>
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Criar transação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
