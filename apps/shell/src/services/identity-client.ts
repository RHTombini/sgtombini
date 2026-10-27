const BASE = import.meta.env.VITE_IDENTITY_URL as string;
const TOKEN_KEY = 'sgt.access_token';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

class IdentityClient {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${BASE}/v1/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Credenciais inválidas');
    const payload = (await res.json()) as { data: LoginResponse };
    return payload.data;
  }

  async me(): Promise<{ id: string; name: string; email: string; role: string }> {
    const token = this.getToken();
    if (!token) throw new Error('Sem token');
    const res = await fetch(`${BASE}/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Sessão inválida');
    const payload = (await res.json()) as {
      data: { id: string; name: string; email: string; role: string };
    };
    return payload.data;
  }

  async logout(): Promise<void> {
    const token = this.getToken();
    if (!token) return;
    await fetch(`${BASE}/v1/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const identityClient = new IdentityClient();
