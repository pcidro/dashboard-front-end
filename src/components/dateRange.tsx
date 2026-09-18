"use client";

import DateInput from "./dateInput";
import { useData } from "@/context/dataContext";

export default function DateRange() {
  const { inicio, setInicio, final, setFinal } = useData();
  return (
    <form
      className="box flex flex-col gap-[var(--gap)] sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <DateInput
        label="Início"
        className="flex-1"
        value={inicio}
        onChange={({ target }) => setInicio(target.value)}
      />
      {inicio}

      <DateInput
        label="Final"
        className="flex-1"
        value={final}
        onChange={({ target }) => setFinal(target.value)}
      />
    </form>
  );
}
