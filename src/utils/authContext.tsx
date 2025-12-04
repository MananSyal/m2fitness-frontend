import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
  created_at?: string;
  // Extra profile fields
  age?: number;
  weight_kg?: number;
  height_cm?: number;
  goal?: string;
}

export interface PendingAction {
  type:
    | 'save'
    | 'like'
    | 'comment'
    | 'share'
    | 'post'
    | 'follow'
    | 'start-workout'
    | 'download'
    | 'get-plan';
  message: string;
  data?: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  returnPath: string | null;
  setReturnPath: (path: string) => void;
  pendingAction: PendingAction | null;
  setPendingAction: (action: PendingAction | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Use Vite env variable for backend URL
const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export const API_BASE = `${RAW_API_URL}/api`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [returnPath, setReturnPath] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('m2fitness_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Login failed');
        return false;
      }

      const userData = (await res.json()) as User;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('m2fitness_user', JSON.stringify(userData));
      return true;
    } catch (err) {
      console.error('Login error', err);
      alert('Error connecting to server');
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Signup failed');
        return false;
      }

      const userData = (await res.json()) as User;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('m2fitness_user', JSON.stringify(userData));
      return true;
    } catch (err) {
      console.error('Signup error', err);
      alert('Error connecting to server');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setReturnPath(null);
    setPendingAction(null);
    localStorage.removeItem('m2fitness_user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        login,
        signup,
        logout,
        returnPath,
        setReturnPath,
        pendingAction,
        setPendingAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
