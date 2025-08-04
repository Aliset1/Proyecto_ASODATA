import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery('dashboard-stats', async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  });

  const { data: aportesChart } = useQuery('aportes-chart', async () => {
    const response = await api.get('/dashboard/aportes-chart');
    return response.data;
  });

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
      {change && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <span className={`font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-gray-500"> desde el mes pasado</span>
          </div>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-asodat-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {user?.apellidos_nombres}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Aquí tienes un resumen de la actividad de ASODAT
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Socios"
          value={stats?.totalSocios || 0}
          icon={UsersIcon}
          color="text-blue-600"
          change={stats?.sociosChange}
        />
        <StatCard
          title="Aportes del Mes"
          value={`$${stats?.aportesMes || 0}`}
          icon={CurrencyDollarIcon}
          color="text-green-600"
          change={stats?.aportesChange}
        />
        <StatCard
          title="Nuevos Ingresos"
          value={stats?.nuevosIngresos || 0}
          icon={UserGroupIcon}
          color="text-purple-600"
          change={stats?.ingresosChange}
        />
                        <StatCard
                  title="Morosos"
                  value={stats?.sociosMorosos || 0}
                  icon={ArrowTrendingUpIcon}
                  color="text-red-600"
                  change={stats?.morososChange}
                />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aportes Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Aportes de los Últimos 6 Meses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aportesChart}>
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

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {stats?.recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-asodat-100 flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 text-asodat-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs text-gray-400">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {user?.rol === 'tesorero' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="btn-primary">
              <CurrencyDollarIcon className="h-5 w-5 mr-2" />
              Registrar Aporte
            </button>
            <button className="btn-secondary">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Generar Reporte
            </button>
            <button className="btn-secondary">
              <UsersIcon className="h-5 w-5 mr-2" />
              Gestionar Socios
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 