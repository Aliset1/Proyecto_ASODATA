import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../services/api';
import {
  DocumentArrowDownIcon,
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Reportes = () => {
  const [reporteActivo, setReporteActivo] = useState('nuevosIngresos');

  const { data: reportes, isLoading } = useQuery('reportes', async () => {
    const response = await api.get('/reportes');
    return response.data;
  });

  const { data: chartData } = useQuery('reportes-chart', async () => {
    const response = await api.get('/reportes/chart');
    return response.data;
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const generarReporte = async (tipo) => {
    try {
      const response = await api.get(`/reportes/${tipo}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte-${tipo}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al generar reporte:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reportes y Estadísticas</h1>
        <p className="mt-1 text-sm text-gray-500">
          Genera y visualiza reportes detallados de la asociación
        </p>
      </div>

      {/* Botones de navegación */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setReporteActivo('nuevosIngresos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              reporteActivo === 'nuevosIngresos'
                ? 'bg-asodat-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <UsersIcon className="h-5 w-5 inline mr-2" />
            Nuevos Ingresos
          </button>
          <button
            onClick={() => setReporteActivo('aporteIndividual')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              reporteActivo === 'aporteIndividual'
                ? 'bg-asodat-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <CurrencyDollarIcon className="h-5 w-5 inline mr-2" />
            Aporte Individual
          </button>
          <button
            onClick={() => setReporteActivo('aporteMensual')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              reporteActivo === 'aporteMensual'
                ? 'bg-asodat-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <CalendarIcon className="h-5 w-5 inline mr-2" />
            Aporte Mensual
          </button>
        </div>
      </div>

      {/* Contenido de reportes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráficos */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Estadísticas de Aportes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="aportes" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución por Campus */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Distribución por Campus
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Belisario', value: 65 },
                  { name: 'Centro', value: 85 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reportes específicos */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Generar Reportes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nuevos Ingresos */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Nuevos Ingresos</h4>
            <p className="text-sm text-gray-600 mb-4">
              Reporte de socios que se han afiliado en el período seleccionado
            </p>
            <div className="space-y-3">
              <input
                type="date"
                className="input-field"
                placeholder="Fecha desde"
              />
              <input
                type="date"
                className="input-field"
                placeholder="Fecha hasta"
              />
              <button
                onClick={() => generarReporte('nuevos-ingresos')}
                className="w-full btn-primary"
              >
                <DocumentArrowDownIcon className="h-4 w-4 inline mr-2" />
                Generar PDF
              </button>
            </div>
          </div>

          {/* Aporte Individual */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Aporte Individual</h4>
            <p className="text-sm text-gray-600 mb-4">
              Reporte detallado de aportes de un socio específico
            </p>
            <div className="space-y-3">
              <input
                type="text"
                className="input-field"
                placeholder="Cédula del socio"
              />
              <select className="input-field">
                <option value="">Seleccionar mes</option>
                <option value="enero">Enero</option>
                <option value="febrero">Febrero</option>
                <option value="marzo">Marzo</option>
                {/* ... más meses */}
              </select>
              <button
                onClick={() => generarReporte('aporte-individual')}
                className="w-full btn-primary"
              >
                <DocumentArrowDownIcon className="h-4 w-4 inline mr-2" />
                Generar PDF
              </button>
            </div>
          </div>

          {/* Aporte Mensual */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Aporte Mensual</h4>
            <p className="text-sm text-gray-600 mb-4">
              Resumen de todos los aportes del mes seleccionado
            </p>
            <div className="space-y-3">
              <select className="input-field">
                <option value="">Seleccionar mes</option>
                <option value="enero">Enero</option>
                <option value="febrero">Febrero</option>
                <option value="marzo">Marzo</option>
                {/* ... más meses */}
              </select>
              <select className="input-field">
                <option value="">Seleccionar año</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <button
                onClick={() => generarReporte('aporte-mensual')}
                className="w-full btn-primary"
              >
                <DocumentArrowDownIcon className="h-4 w-4 inline mr-2" />
                Generar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Socios</p>
              <p className="text-2xl font-semibold text-gray-900">150</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Aportes Mes</p>
              <p className="text-2xl font-semibold text-gray-900">$1,500</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Nuevos Ingresos</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Morosos</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exportar datos */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Exportar Datos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-secondary">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exportar Socios (Excel)
          </button>
          <button className="btn-secondary">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exportar Aportes (Excel)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reportes; 