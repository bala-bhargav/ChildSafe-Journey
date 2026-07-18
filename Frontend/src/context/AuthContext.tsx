import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/auth.api';
import { socketService } from '@/services/socket.client';
import type { UserRole, AuthState } from '@/types/auth';
import { getAuthToken, setAuthToken } from '@/services/api.client';
import { STORAGE_KEYS } from '@/constants/app.constants';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: UserRole; phoneNumber: string }) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const navigate = useNavigate();

  const loadAuth = useCallback(async () => {
    const token = getAuthToken();
    const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setState({ user, token, isAuthenticated: true, isLoading: false });
      } catch {
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    loadAuth();

    const handleAuthLogout = () => {
      socketService.disconnect();
      setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    };

    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, [loadAuth]);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const { token, user } = response.data;
    setAuth(token, user);
  };

  const register = async (data: { name: string; email: string; password: string; role: UserRole; phoneNumber: string }) => {
    const response = await authApi.register(data);
    const { token, user } = response.data;
    setAuth(token, user);
  };

  const setAuth = (token: string, user: any) => {
    setAuthToken(token);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    setState({ user, token, isAuthenticated: true, isLoading: false });

    socketService.connect(token);

    redirectByRole(user.role);
  };

const redirectByRole = (role: string) => {
    const targetPath = role === 'admin' ? '/admin' : role === 'driver' ? '/driver' : '/parent';
    navigate(targetPath, { replace: true });
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    socketService.disconnect();
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    navigate('/login', { replace: true });
  };

  const hasRole = (roles: UserRole[]) => {
    return state.user ? roles.includes(state.user.role) : false;
  };

  const refreshUser = async () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setState(prev => ({ ...prev, user }));
      } catch {
        // ignore
      }
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, hasRole, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};