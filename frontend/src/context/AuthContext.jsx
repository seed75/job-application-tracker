import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken]     = useState(() => localStorage.getItem('token'));
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem('guest') === 'true');

  function login(newToken) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function loginAsGuest() {
    localStorage.setItem('guest', 'true');
    setIsGuest(true);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('guest');
    setToken(null);
    setIsGuest(false);
  }

  return (
    <AuthContext.Provider value={{ token, isGuest, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
