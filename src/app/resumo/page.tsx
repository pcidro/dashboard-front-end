import ResumoCards from "@/components/resumo/ResumoCards";
import { ResumoContextProvider } from "@/context/resumoContext";

export default function PageResumo() {
  return (
    <ResumoContextProvider>
      <ResumoCards />
    </ResumoContextProvider>
  );
}
