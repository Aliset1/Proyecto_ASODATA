import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Datos = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      apellidos_nombres: user?.apellidos_nombres || '',
      cedula: user?.cedula || '',
      correo: user?.correo || '',
      celular: user?.celular || '',
      campus: user?.campus || '',
      regimen: user?.regimen || '',
      direccion: user?.direccion || '',
      cargo: user?.cargo || '',
      observaciones: user?.observaciones || ''
    }
  });

  const onSubmit = async (data) => {
    try {
      // Aquí iría la lógica para actualizar los datos en el backend
      console.log('Datos actualizados:', data);
      updateUser({ ...user, ...data });
      toast.success('Datos actualizados exitosamente');
      setIsEditing(false);
    } catch (error) {
      toast.error('Error al actualizar los datos');
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const campusOptions = [
    { value: 'BELISARIO', label: 'Campus Belisario' },
    { value: 'CENTRO', label: 'Campus Centro' }
  ];

  const regimenOptions = [
    { value: 'DOCENTE', label: 'Docente' },
    { value: 'SERVIDOR PUBLICO', label: 'Servidor Público' },
    { value: 'TRABAJADOR PUBLICO', label: 'Trabajador Público' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Datos Personales</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona tu información personal en ASODAT
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary"
        >
          <PencilIcon className="h-5 w-5 mr-2" />
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {/* Formulario */}
      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Información Personal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="h-4 w-4 inline mr-1" />
                  Apellidos y Nombres
                </label>
                <input
                  type="text"
                  {...register('apellidos_nombres', { 
                    required: 'Los apellidos y nombres son requeridos' 
                  })}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                />
                {errors.apellidos_nombres && (
                  <p className="mt-1 text-sm text-red-600">{errors.apellidos_nombres.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <IdentificationIcon className="h-4 w-4 inline mr-1" />
                  Cédula
                </label>
                <input
                  type="text"
                  {...register('cedula', { 
                    required: 'La cédula es requerida',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'La cédula debe tener 10 dígitos'
                    }
                  })}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                />
                {errors.cedula && (
                  <p className="mt-1 text-sm text-red-600">{errors.cedula.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <EnvelopeIcon className="h-4 w-4 inline mr-1" />
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  {...register('correo', { 
                    required: 'El correo electrónico es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Ingresa un correo electrónico válido'
                    }
                  })}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                />
                {errors.correo && (
                  <p className="mt-1 text-sm text-red-600">{errors.correo.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <PhoneIcon className="h-4 w-4 inline mr-1" />
                  Celular
                </label>
                <input
                  type="tel"
                  {...register('celular', { 
                    required: 'El celular es requerido',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'El celular debe tener 10 dígitos'
                    }
                  })}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                />
                {errors.celular && (
                  <p className="mt-1 text-sm text-red-600">{errors.celular.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Información Laboral */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Información Laboral
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon className="h-4 w-4 inline mr-1" />
                  Campus
                </label>
                <select
                  {...register('campus', { required: 'Selecciona tu campus' })}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                >
                  <option value="">Selecciona tu campus</option>
                  {campusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.campus && (
                  <p className="mt-1 text-sm text-red-600">{errors.campus.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AcademicCapIcon className="h-4 w-4 inline mr-1" />
                  Régimen
                </label>
                <select
                  {...register('regimen', { required: 'Selecciona tu régimen' })}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                >
                  <option value="">Selecciona tu régimen</option>
                  {regimenOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.regimen && (
                  <p className="mt-1 text-sm text-red-600">{errors.regimen.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cargo
              </label>
              <input
                type="text"
                {...register('cargo')}
                disabled={!isEditing}
                className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="Tu cargo actual"
              />
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 inline mr-1" />
              Dirección
            </label>
            <textarea
              {...register('direccion')}
              rows="3"
              disabled={!isEditing}
              className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
              placeholder="Tu dirección completa"
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              {...register('observaciones')}
              rows="3"
              disabled={!isEditing}
              className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
              placeholder="Información adicional"
            />
          </div>

          {/* Botones de acción */}
          {isEditing && (
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                <XMarkIcon className="h-5 w-5 mr-2" />
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                <CheckIcon className="h-5 w-5 mr-2" />
                Guardar Cambios
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Información de Afiliación
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha de Afiliación:</span>
              <span className="font-medium">
                {user?.fecha_afiliacion ? new Date(user.fecha_afiliacion).toLocaleDateString('es-ES') : 'No registrada'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo de Usuario:</span>
              <span className="font-medium capitalize">{user?.tipo_usuario || 'Nuevo'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rol en la Asociación:</span>
              <span className="font-medium capitalize">{user?.rol || 'Socio'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Estado de Cuenta
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="font-medium text-green-600">Activo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Aportes al Día:</span>
              <span className="font-medium text-green-600">Sí</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Último Aporte:</span>
              <span className="font-medium">Enero 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datos; 