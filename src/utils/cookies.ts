import Cookies from "js-cookie";

const COOKIE_NAME = "token";

export function getToken(): string | undefined {
  return Cookies.get(COOKIE_NAME);
}

export function setToken(token: string) {
  Cookies.set(COOKIE_NAME, token, {
    expires: 7,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function removeToken() {
  Cookies.remove(COOKIE_NAME, { path: "/" });
}
