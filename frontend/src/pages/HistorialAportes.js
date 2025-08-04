import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const HistorialAportes = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: historial, isLoading } = useQuery(
    ['historial-aportes', user?.cedula, selectedYear],
    async () => {
      const response = await api.get(`/historial-aportes/${user?.cedula}`, {
        params: { year: selectedYear }
      });
      return response.data;
    },
    {
      enabled: !!user?.cedula
    }
  );

  const { data: resumen } = useQuery(
    ['resumen-aportes', user?.cedula],
    async () => {
      const response = await api.get(`/resumen-aportes/${user?.cedula}`);
      return response.data;
    },
    {
      enabled: !!user?.cedula
    }
  );

  const descargarComprobante = async (id) => {
    try {
      const response = await api.get(`/comprobantes/${id}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `comprobante-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar comprobante:', error);
    }
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi Historial de Aportes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Consulta el historial completo de tus aportes a ASODAT
        </p>
      </div>

      {/* Resumen de aportes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Aportado</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${resumen?.totalAportado || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Meses Pagados</p>
              <p className="text-2xl font-semibold text-gray-900">
                {resumen?.mesesPagados || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Último Pago</p>
              <p className="text-2xl font-semibold text-gray-900">
                {resumen?.ultimoPago || 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Estado</p>
              <p className="text-2xl font-semibold text-green-600">
                {resumen?.estado || 'Al día'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por mes o descripción..."
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-field"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de historial */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Historial de Aportes
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Fecha</th>
                <th className="table-header">Mes</th>
                <th className="table-header">Monto</th>
                <th className="table-header">Tipo</th>
                <th className="table-header">Estado</th>
                <th className="table-header">Comprobante</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-asodat-600 mx-auto"></div>
                  </td>
                </tr>
              ) : historial?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No hay aportes registrados para este período
                  </td>
                </tr>
              ) : (
                historial?.map((aporte) => (
                  <tr key={aporte.id} className="hover:bg-gray-50">
                    <td className="table-cell">
                      {format(new Date(aporte.fecha), 'dd/MM/yyyy', { locale: es })}
                    </td>
                    <td className="table-cell capitalize">{aporte.mes}</td>
                    <td className="table-cell">${aporte.monto}</td>
                    <td className="table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        aporte.tipo === 'mensual' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {aporte.tipo}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        aporte.estado === 'pagado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {aporte.estado}
                      </span>
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => descargarComprobante(aporte.id)}
                        className="text-asodat-600 hover:text-asodat-700"
                        title="Descargar comprobante"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico de aportes */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Evolución de Aportes
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          <p>Gráfico de evolución de aportes (implementar con Recharts)</p>
        </div>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Información Importante
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Los aportes mensuales son de $10.00</p>
            <p>• Los nuevos ingresos pagan $5.00 adicionales</p>
            <p>• Los comprobantes se generan automáticamente</p>
            <p>• Puedes descargar tus comprobantes en cualquier momento</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Contacto para Dudas
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Email:</strong> tesoreria@asodat.espe.edu.ec</p>
            <p><strong>Teléfono:</strong> (03) 2-XXX-XXX</p>
            <p><strong>Horario:</strong> Lunes a Viernes 8:00 - 17:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialAportes; 