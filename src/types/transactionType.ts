export type TransactionType = "RECEITA" | "DESPESA";

export type TransactionStatus = "PENDENTE" | "PAGO" | "ATRASADO";

export type PaymentMethod =
  | "PIX"
  | "DINHEIRO"
  | "CARTAO_DEBITO"
  | "CARTAO_CREDITO"
  | "TRANSFERENCIA_BANCARIA"
  | "BOLETO"
  | "OUTRO";

export interface TransactionTypeData {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: TransactionType;
  status: TransactionStatus;
  paymentMethod?: PaymentMethod | null;
  notes?: string | null;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
