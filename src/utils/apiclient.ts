const API_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3333";

export function getApiUrl() {
  return API_URL;
}

interface FetchOptions extends RequestInit {
  token?: string;
  cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(fetchOptions.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "";

    try {
      const data = await response.json();
      if (
        data?.details &&
        Array.isArray(data.details) &&
        data.details.length > 0
      ) {
        errorMessage = data.details
          .map((d: { message?: string }) => d.message)
          .filter(Boolean)
          .join(", ");
      } else if (typeof data?.error === "string") {
        errorMessage = data.error;
      } else if (typeof data?.message === "string") {
        errorMessage = data.message;
      }
    } catch {}

    if (!errorMessage) {
      if (response.status === 403 || response.status === 401) {
        errorMessage =
          "Ação não autorizada. Apenas administradores podem realizar esta operação.";
      } else {
        errorMessage = `Erro na requisição: ${response.statusText || response.status}`;
      }
    }

    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}
