'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Mock user type
interface PseudoUser {
  email: string;
  role: 'student' | 'professor';
}

interface AuthContextType {
  user: PseudoUser | null;
  loading: boolean;
  pseudoSignIn: (email: string, role: 'student' | 'professor') => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<PseudoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user info is in localStorage
    try {
      const storedUser = localStorage.getItem('proftrack_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('proftrack_user');
    }
    setLoading(false);
  }, []);

  const pseudoSignIn = (email: string, role: 'student' | 'professor') => {
    const newUser: PseudoUser = { email, role };
    localStorage.setItem('proftrack_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const signOut = () => {
    localStorage.removeItem('proftrack_user');
    setUser(null);
    // Redirect to home page
    if (typeof window !== 'undefined') {
        window.location.href = '/';
    }
  };
  
  const value = {
    user,
    loading,
    pseudoSignIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
