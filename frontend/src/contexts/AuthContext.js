import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('asodat_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (cedula, contrasena) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { cedula, contrasena });
      
      if (response.data.status === 'success') {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('asodat_user', JSON.stringify(userData));
        toast.success('¡Bienvenido!');
        navigate('/dashboard');
      } else {
        toast.error(response.data.mensaje || 'Error en la autenticación');
      }
    } catch (error) {
      console.error('Error de login:', error);
      toast.error('Error en la conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('asodat_user');
    toast.success('Sesión cerrada exitosamente');
    navigate('/');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('asodat_user', JSON.stringify(userData));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 