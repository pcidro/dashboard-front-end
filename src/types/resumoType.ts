export interface EvolucaoDiaria {
  data: string;
  receitas: number;
  despesas: number;
  saldo: number;
}

export interface CategoriaResumo {
  id: string;
  nome: string;
  color: string | null;
  total: number;
}

export interface ResumoTotais {
  receitas: number;
  despesas: number;
  saldo: number;
  totalTransacoes: number;
  pago: number;
  pendente: number;
}

export interface ResumoData {
  totais: ResumoTotais;
  evolucaoDiaria: EvolucaoDiaria[];
  porCategoria: CategoriaResumo[];
}
