import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../services/api';
import {
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const AportesSocios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('');

  const { data: aportesSocios, isLoading } = useQuery(
    ['aportes-socios', selectedMonth, selectedCampus],
    async () => {
      const response = await api.get('/aportes-socios', {
        params: {
          month: selectedMonth,
          campus: selectedCampus,
          search: searchTerm
        }
      });
      return response.data;
    }
  );

  const { data: estadisticas } = useQuery('estadisticas-aportes', async () => {
    const response = await api.get('/estadisticas-aportes');
    return response.data;
  });

  const meses = [
    { value: 'enero', label: 'Enero' },
    { value: 'febrero', label: 'Febrero' },
    { value: 'marzo', label: 'Marzo' },
    { value: 'abril', label: 'Abril' },
    { value: 'mayo', label: 'Mayo' },
    { value: 'junio', label: 'Junio' },
    { value: 'julio', label: 'Julio' },
    { value: 'agosto', label: 'Agosto' },
    { value: 'septiembre', label: 'Septiembre' },
    { value: 'octubre', label: 'Octubre' },
    { value: 'noviembre', label: 'Noviembre' },
    { value: 'diciembre', label: 'Diciembre' }
  ];

  const campus = [
    { value: '', label: 'Todos los campus' },
    { value: 'BELISARIO', label: 'Campus Belisario' },
    { value: 'CENTRO', label: 'Campus Centro' }
  ];

  const descargarReporte = async (tipo) => {
    try {
      const response = await api.get(`/reportes/${tipo}`, {
        responseType: 'blob',
        params: {
          month: selectedMonth,
          campus: selectedCampus
        }
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte-${tipo}-${selectedMonth}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar reporte:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Aportes de Socios</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestiona y consulta los aportes de todos los socios de ASODAT
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Socios</p>
              <p className="text-2xl font-semibold text-gray-900">
                {estadisticas?.totalSocios || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Aportes</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${estadisticas?.totalAportes || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Socios Pagados</p>
              <p className="text-2xl font-semibold text-gray-900">
                {estadisticas?.sociosPagados || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Socios Morosos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {estadisticas?.sociosMorosos || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MagnifyingGlassIcon className="h-4 w-4 inline mr-1" />
              Buscar Socio
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cédula o nombre..."
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="h-4 w-4 inline mr-1" />
              Mes
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="input-field"
            >
              <option value="">Todos los meses</option>
              {meses.map(mes => (
                <option key={mes.value} value={mes.value}>{mes.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FunnelIcon className="h-4 w-4 inline mr-1" />
              Campus
            </label>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="input-field"
            >
              {campus.map(camp => (
                <option key={camp.value} value={camp.value}>{camp.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="btn-primary w-full">
              <PlusIcon className="h-5 w-5 mr-2" />
              Registrar Aporte
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de aportes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Lista de Aportes
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => descargarReporte('aportes-excel')}
              className="btn-secondary"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Exportar Excel
            </button>
            <button
              onClick={() => descargarReporte('aportes-pdf')}
              className="btn-secondary"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Exportar PDF
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Socio</th>
                <th className="table-header">Cédula</th>
                <th className="table-header">Campus</th>
                <th className="table-header">Mes</th>
                <th className="table-header">Monto</th>
                <th className="table-header">Fecha Pago</th>
                <th className="table-header">Estado</th>
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-asodat-600 mx-auto"></div>
                  </td>
                </tr>
              ) : aportesSocios?.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    No hay aportes registrados para los filtros seleccionados
                  </td>
                </tr>
              ) : (
                aportesSocios?.map((aporte) => (
                  <tr key={aporte.id} className="hover:bg-gray-50">
                    <td className="table-cell">
                      <div>
                        <div className="font-medium text-gray-900">
                          {aporte.apellidos_nombres}
                        </div>
                        <div className="text-sm text-gray-500">
                          {aporte.cargo}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">{aporte.cedula}</td>
                    <td className="table-cell capitalize">{aporte.campus}</td>
                    <td className="table-cell capitalize">{aporte.mes}</td>
                    <td className="table-cell">${aporte.monto}</td>
                    <td className="table-cell">
                      {aporte.fecha_pago ? new Date(aporte.fecha_pago).toLocaleDateString('es-ES') : 'Pendiente'}
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
                      <div className="flex space-x-2">
                        <button
                          className="text-asodat-600 hover:text-asodat-700"
                          title="Ver detalles"
                        >
                          <MagnifyingGlassIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-700"
                          title="Marcar como pagado"
                        >
                          <CurrencyDollarIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      {aportesSocios?.length > 0 && (
        <div className="bg-white shadow rounded-lg px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">25</span> de{' '}
              <span className="font-medium">{aportesSocios.length}</span> resultados
            </div>
            <div className="flex space-x-2">
              <button className="btn-secondary px-3 py-1">Anterior</button>
              <button className="btn-primary px-3 py-1">1</button>
              <button className="btn-secondary px-3 py-1">2</button>
              <button className="btn-secondary px-3 py-1">3</button>
              <button className="btn-secondary px-3 py-1">Siguiente</button>
            </div>
          </div>
        </div>
      )}

      {/* Resumen por campus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Resumen por Campus
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Campus Belisario</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">45 socios</span>
                <span className="font-medium text-green-600">$450</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Campus Centro</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">105 socios</span>
                <span className="font-medium text-green-600">$1,050</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Acciones Rápidas
          </h3>
          <div className="space-y-3">
            <button className="w-full btn-primary">
              <PlusIcon className="h-4 w-4 mr-2" />
              Registrar Aporte Masivo
            </button>
            <button className="w-full btn-secondary">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Generar Reporte Mensual
            </button>
            <button className="w-full btn-secondary">
              <UsersIcon className="h-4 w-4 mr-2" />
              Enviar Recordatorios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AportesSocios; 