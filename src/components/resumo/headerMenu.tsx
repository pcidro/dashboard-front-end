"use client";

import CreateTransactionModal from "@/modais/createTransactionModal";

import { useState } from "react";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="w-28">
            <img
              src="/logo.png"
              alt="Spend"
              className="h-auto w-full object-contain"
            />
          </div>

          <nav>
            <ul className="flex items-center gap-3">
              <li>
                <button
                  onClick={() => setIsOpen(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                >
                  + Criar transação
                </button>
              </li>

              <li>
                <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95">
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <CreateTransactionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
