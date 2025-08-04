import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Páginas públicas
import Home from './pages/Home';
import Login from './pages/Login';
import Servicios from './pages/Servicios';
import Afiliacion from './pages/Afiliacion';
import Noticias from './pages/Noticias';

// Páginas protegidas
import Dashboard from './pages/Dashboard';
import Socios from './pages/Socios';
import Aportes from './pages/Aportes';
import Reportes from './pages/Reportes';
import Datos from './pages/Datos';
import HistorialAportes from './pages/HistorialAportes';
import AportesSocios from './pages/AportesSocios';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/afiliacion" element={<Afiliacion />} />
        <Route path="/noticias" element={<Noticias />} />
        
        {/* Rutas protegidas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/socios" element={
          <ProtectedRoute allowedRoles={['tesorero', 'secretaria']}>
            <Layout>
              <Socios />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/aportes" element={
          <ProtectedRoute allowedRoles={['tesorero']}>
            <Layout>
              <Aportes />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/reportes" element={
          <ProtectedRoute allowedRoles={['tesorero']}>
            <Layout>
              <Reportes />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/datos" element={
          <ProtectedRoute allowedRoles={['socio', 'tesorero', 'secretaria']}>
            <Layout>
              <Datos />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/historial-aportes" element={
          <ProtectedRoute allowedRoles={['socio', 'tesorero', 'secretaria']}>
            <Layout>
              <HistorialAportes />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/aportes-socios" element={
          <ProtectedRoute allowedRoles={['tesorero']}>
            <Layout>
              <AportesSocios />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App; 