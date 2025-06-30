import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../../shared/api';
import { authApi, apiUtils } from '../lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; username: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: { firstName?: string; lastName?: string; avatar?: string }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      apiUtils.setAuthToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: { email: string; username: string; password: string; firstName?: string; lastName?: string }) => {
    try {
      const response = await authApi.register(userData);
      apiUtils.setAuthToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    apiUtils.removeAuthToken();
    setUser(null);
  };

  const updateProfile = async (profileData: { firstName?: string; lastName?: string; avatar?: string }) => {
    try {
      const response = await authApi.updateProfile(profileData);
      if (response.data?.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      if (apiUtils.isAuthenticated()) {
        const response = await authApi.getProfile();
        if (response.data?.user) {
          setUser(response.data.user);
        }
      }
    } catch (error) {
      console.error('Profile refresh error:', error);
      // If token is invalid, logout
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 