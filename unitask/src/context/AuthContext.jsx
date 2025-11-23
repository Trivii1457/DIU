import { createContext, useContext, useState, useEffect } from 'react';
import { UserRepository } from '../data/repositories';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const authenticatedUser = await UserRepository.authenticate(username, password);
      if (authenticatedUser) {
        // Don't store password
        const userToStore = { ...authenticatedUser, password: undefined };
        setUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        return { success: true };
      }
      return { success: false, error: 'Usuario o contraseña incorrectos' };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  };

  const register = async (userData) => {
    try {
      // Check if username already exists
      const existingUser = await UserRepository.getByUsername(userData.username);
      if (existingUser) {
        return { success: false, error: 'El nombre de usuario ya existe' };
      }

      // Check if email already exists
      const existingEmail = await UserRepository.getByEmail(userData.email);
      if (existingEmail) {
        return { success: false, error: 'El correo electrónico ya está registrado' };
      }

      const newUser = await UserRepository.create(userData);
      const userToStore = { ...newUser, password: undefined };
      setUser(userToStore);
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      return { success: true };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: 'Error al registrar usuario' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
