import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await login(data.cedula, data.contrasena);
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-asodat-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img
              className="h-16 w-auto"
              src="/logo.png"
              alt="ASODAT Logo"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Accede a tu cuenta de ASODAT
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                Cédula
              </label>
              <input
                id="cedula"
                type="text"
                {...register('cedula', { 
                  required: 'La cédula es requerida',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'La cédula debe tener 10 dígitos'
                  }
                })}
                className="mt-1 input-field"
                placeholder="Ingresa tu cédula"
              />
              {errors.cedula && (
                <p className="mt-1 text-sm text-red-600">{errors.cedula.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="contrasena"
                  type={showPassword ? 'text' : 'password'}
                  {...register('contrasena', { 
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                  })}
                  className="input-field pr-10"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.contrasena && (
                <p className="mt-1 text-sm text-red-600">{errors.contrasena.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-asodat-600 hover:bg-asodat-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-asodat-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/recuperar"
              className="font-medium text-asodat-600 hover:text-asodat-500"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>


        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/afiliacion"
              className="font-medium text-asodat-600 hover:text-asodat-500"
            >
              Afíliate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 