"use client";

export default function LoginForm() {
  return (
    <div className="w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700">
            Nome
          </label>

          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome"
            className=" rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
            type="password"
            placeholder="Digite sua senha"
            className=" rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-primary py-2.5 px-5 rounded mt-4"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
