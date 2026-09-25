"use server";

import { apiClient } from "@/utils/apiclient";
import { cookies } from "next/headers";

export type transactionActionProps = {
  date: string;
  description: string;
  status: string;
  amount: number;
  paymentMethod: string;
  type: string;
  categoryId: string;
};

export async function CreateTransactionAction(request: transactionActionProps) {
  const token = (await cookies()).get("token")?.value;

  try {
    if (!token) {
      return;
    }

    const response = await apiClient("/api/transaction", {
      method: "POST",
      body: JSON.stringify(request),
      token,
    });
  } catch (error) {
    console.log(error);
  }
}
