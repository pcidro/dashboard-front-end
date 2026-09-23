"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  login: (credentials: { email: string; password: string }) => Promise<unknown>;
}

export default function LoginForm({ login }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login({ email, password });
      router.push("/");
    } catch (err: any) {
      setError(err?.message || "Falha ao realizar login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded bg-red-100 p-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Digite seu email"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Digite sua senha"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-600 py-2.5 px-5 rounded mt-2 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
