import { apiFetch } from '@/services/mockApi';
import * as SecureStore from 'expo-secure-store';
import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'access_token';

// SecureStore is native-only; on web it is unavailable, so skip storage calls there.
async function storageAvailable() {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // True until the saved session (if any) has been checked on startup.
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (accessToken: string, userData: User) => {
    try {
      if (await storageAvailable()) {
        await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      }
      // Only the token is stored. The password is never saved.
      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to save authentication session:', error);
      throw new Error('Unable to save your login session.');
    }
  };

  const logout = async () => {
    try {
      if (await storageAvailable()) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Failed to clear authentication session:', error);
    } finally {
      // Clearing the token is enough: the protected routes in app/_layout.tsx
      // switch back to /sign-in automatically.
      setToken(null);
      setUser(null);
    }
  };

  const restoreSession = useCallback(async () => {
    setAuthLoading(true);
    try {
      if (!(await storageAvailable())) return;
      const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!savedToken) return;

      const response = await apiFetch('/profile', {
        headers: { Authorization: `Bearer ${savedToken}` },
      });

      if (response.status === 401) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        return;
      }
      if (!response.ok) return;

      const profile: User = await response.json();
      setToken(savedToken);
      setUser(profile);
    } catch (error) {
      console.error('Failed to restore session:', error);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <AuthContext.Provider value={{ token, user, authLoading, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}