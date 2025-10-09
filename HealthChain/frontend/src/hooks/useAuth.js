// src/hooks/useAuth.js
export default function useAuth() {
  const token = localStorage.getItem("hc_token");
  const user = JSON.parse(localStorage.getItem("hc_user") || "null");
  const isLoggedIn = !!token;
  return { token, user, isLoggedIn };
}