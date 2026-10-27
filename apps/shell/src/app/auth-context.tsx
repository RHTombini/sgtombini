import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { identityClient } from '../services/identity-client';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = identityClient.getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    identityClient
      .me()
      .then((u) => setUser(u))
      .catch(() => identityClient.clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const session = await identityClient.login(email, password);
    identityClient.setToken(session.accessToken);
    const me = await identityClient.me();
    setUser(me);
  };

  const logout = async () => {
    await identityClient.logout().catch(() => undefined);
    identityClient.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth fora do AuthProvider');
  return ctx;
}
