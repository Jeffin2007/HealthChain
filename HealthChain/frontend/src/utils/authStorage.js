import { STORAGE_KEYS } from '../constants/storageKeys';

export function getStoredToken() {
  return sessionStorage.getItem(STORAGE_KEYS.TOKEN) || localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function getStoredUser() {
  const raw = sessionStorage.getItem(STORAGE_KEYS.USER) || localStorage.getItem(STORAGE_KEYS.USER);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function persistAuth({ token, user, remember = false }) {
  const store = remember ? localStorage : sessionStorage;
  store.setItem(STORAGE_KEYS.TOKEN, token);
  store.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function clearAuthStorage() {
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}
