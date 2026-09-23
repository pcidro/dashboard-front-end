"use client";

import LoginForm from "@/components/login/loginForm";
import { apiClient } from "@/utils/apiclient";
import { setToken } from "@/utils/cookies";

export default function Page() {
  async function handleLogin(credentials: { email: string; password: string }) {
    const data = await apiClient<{
      token: string;
      name: string;
      email: string;
    }>("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (data.token) {
      setToken(data.token);
    }

    return data;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm login={handleLogin} />
    </div>
  );
}
