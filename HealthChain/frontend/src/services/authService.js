// src/services/authService.js
import API from "./api";

export async function login(username, password) {
  const res = await API.post("/auth/login", { username, password });
  // expected: { user: {...}, token: "..." }
  const { user, token } = res.data;
  localStorage.setItem("hc_token", token);
  localStorage.setItem("hc_user", JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem("hc_token");
  localStorage.removeItem("hc_user");
}