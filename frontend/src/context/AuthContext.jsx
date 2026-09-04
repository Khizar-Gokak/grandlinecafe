import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser as apiLoginUser, registerUser as apiRegisterUser } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('grandline_user');
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;
      return parsedUser?.isGuest ? null : parsedUser;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('grandline_token') || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('grandline_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('grandline_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('grandline_token', token);
    } else {
      localStorage.removeItem('grandline_token');
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    getCurrentUser(token)
      .then((res) => setUser(res.data.user))
      .catch((error) => {
        if (error.status === 401) {
          setUser(null);
          setToken(null);
        }
      });
  }, [token]);

  const login = async (email, password) => {
    const res = await apiLoginUser({ email, password });
    if (res.success && res.data) {
      setUser(res.data.user);
      setToken(res.data.token || 'mock-token');
      return res.data.user;
    } else {
      throw new Error(res.message || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    const res = await apiRegisterUser({ name, email, password });
    if (res.success && res.data) {
      setUser(res.data.user);
      setToken(res.data.token || 'mock-token');
      return res.data.user;
    } else {
      throw new Error(res.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('grandline_user');
    localStorage.removeItem('grandline_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
