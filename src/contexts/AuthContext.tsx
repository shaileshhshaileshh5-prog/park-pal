import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, mockUsers } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'driver' | 'host') => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'driver' | 'host' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    
    // Demo: allow any login
    const demoUser: User = {
      id: 'demo-' + Date.now(),
      name: email.split('@')[0],
      email,
      role: 'driver',
      phone: '+1 555-000-0000',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      isApproved: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(demoUser);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: 'driver' | 'host'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      role,
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      isApproved: role === 'driver',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role: 'driver' | 'host' | 'admin') => {
    if (user) {
      setUser({ ...user, role });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
