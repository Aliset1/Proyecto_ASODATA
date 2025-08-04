import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Socios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: socios, isLoading } = useQuery(
    ['socios', searchTerm, currentPage],
    async () => {
      const response = await api.get('/socios', {
        params: { search: searchTerm, page: currentPage, limit: 25 }
      });
      return response.data;
    }
  );

  const deleteMutation = useMutation(
    async (cedula) => {
      await api.delete(`/socios/${cedula}`);
    },
    {
      onSuccess: () => {
        toast.success('Socio eliminado exitosamente');
        queryClient.invalidateQueries('socios');
      },
      onError: () => {
        toast.error('Error al eliminar el socio');
      },
    }
  );

  const handleDelete = (cedula, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      deleteMutation.mutate(cedula);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const filteredSocios = socios?.data || [];
  const totalPages = socios?.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Socios</h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra la información de los socios de ASODAT
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-secondary">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exportar
          </button>
          <button className="btn-primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Socio
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por cédula o nombre..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Buscar
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Nombre</th>
                <th className="table-header">Cédula</th>
                <th className="table-header">Campus</th>
                <th className="table-header">Rol</th>
                <th className="table-header">Fecha Afiliación</th>
                <th className="table-header">Estado</th>
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-asodat-600 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredSocios.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No se encontraron socios
                  </td>
                </tr>
              ) : (
                filteredSocios.map((socio) => (
                  <tr key={socio.cedula} className="hover:bg-gray-50">
                    <td className="table-cell">
                      <div>
                        <div className="font-medium text-gray-900">
                          {socio.apellidos_nombres}
                        </div>
                        <div className="text-sm text-gray-500">
                          {socio.correo}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">{socio.cedula}</td>
                    <td className="table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        socio.campus === 'BELISARIO' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {socio.campus}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className="capitalize">{socio.rol}</span>
                    </td>
                    <td className="table-cell">
                      {socio.fecha_afiliacion 
                        ? format(new Date(socio.fecha_afiliacion), 'dd/MM/yyyy', { locale: es })
                        : 'N/A'
                      }
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        socio.estado === 'activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {socio.estado || 'activo'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedSocio(socio);
                            setShowModal(true);
                          }}
                          className="text-asodat-600 hover:text-asodat-900"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            // Editar socio
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(socio.cedula, socio.apellidos_nombres)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="btn-secondary"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="btn-secondary"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{(currentPage - 1) * 25 + 1}</span> a{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * 25, socios?.total || 0)}
                  </span>{' '}
                  de <span className="font-medium">{socios?.total || 0}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-asodat-50 border-asodat-500 text-asodat-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalles */}
      {showModal && selectedSocio && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Detalles del Socio
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nombre:</label>
                  <p className="text-sm text-gray-900">{selectedSocio.apellidos_nombres}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Cédula:</label>
                  <p className="text-sm text-gray-900">{selectedSocio.cedula}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Campus:</label>
                  <p className="text-sm text-gray-900">{selectedSocio.campus}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Rol:</label>
                  <p className="text-sm text-gray-900 capitalize">{selectedSocio.rol}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Correo:</label>
                  <p className="text-sm text-gray-900">{selectedSocio.correo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Celular:</label>
                  <p className="text-sm text-gray-900">{selectedSocio.celular || 'N/A'}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Socios; 