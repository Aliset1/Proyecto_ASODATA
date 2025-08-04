import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación (si se implementa en el futuro)
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('asodat_user') || 'null');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('asodat_user');
      window.location.href = '/login';
    }
    
    // Manejar errores de red
    if (!error.response) {
      console.error('Error de conexión:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api; 