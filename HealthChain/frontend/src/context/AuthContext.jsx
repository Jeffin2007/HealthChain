import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearAuthStorage, getStoredToken, getStoredUser, persistAuth } from '../utils/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setToken(getStoredToken());
    setUser(getStoredUser());
    setAuthReady(true);
  }, []);

  const login = useCallback(({ token: nextToken, user: nextUser, remember }) => {
    persistAuth({ token: nextToken, user: nextUser, remember });
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ token, user, isLoggedIn: Boolean(token), authReady, login, logout }), [token, user, authReady, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
