import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  HeartIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const Afiliacion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Aquí iría la lógica para enviar los datos al backend
      console.log('Datos de afiliación:', data);
      toast.success('¡Solicitud enviada exitosamente! Nos pondremos en contacto contigo pronto.');
      reset();
    } catch (error) {
      toast.error('Error al enviar la solicitud. Intenta nuevamente.');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-asodat-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img src="/logo.png" alt="ASODAT" className="h-12 w-auto" />
              <span className="ml-3 text-2xl font-bold text-gray-900">ASODAT</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-500 hover:text-asodat-600">Inicio</a>
              <a href="/servicios" className="text-gray-500 hover:text-asodat-600">Servicios</a>
              <a href="/afiliacion" className="text-asodat-600 font-medium">Afiliación</a>
              <a href="/noticias" className="text-gray-500 hover:text-asodat-600">Noticias</a>
              <a href="/login" className="btn-primary">Iniciar Sesión</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Únete a ASODAT</span>
            <span className="block text-asodat-600">Hoy Mismo</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Forma parte de nuestra comunidad y disfruta de todos los beneficios 
            que tenemos para ti y tu familia.
          </p>
        </div>
      </section>

      {/* Formulario de Afiliación */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Formulario de Afiliación
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Información Personal */}
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
                    className="input-field"
                    placeholder="Ingresa tus apellidos y nombres completos"
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
                    className="input-field"
                    placeholder="Ingresa tu número de cédula"
                  />
                  {errors.cedula && (
                    <p className="mt-1 text-sm text-red-600">{errors.cedula.message}</p>
                  )}
                </div>
              </div>

              {/* Información de Contacto */}
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
                    className="input-field"
                    placeholder="tu.correo@espe.edu.ec"
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
                    className="input-field"
                    placeholder="0987654321"
                  />
                  {errors.celular && (
                    <p className="mt-1 text-sm text-red-600">{errors.celular.message}</p>
                  )}
                </div>
              </div>

              {/* Información Laboral */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="h-4 w-4 inline mr-1" />
                    Campus
                  </label>
                  <select
                    {...register('campus', { required: 'Selecciona tu campus' })}
                    className="input-field"
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
                    className="input-field"
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

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon className="h-4 w-4 inline mr-1" />
                  Dirección
                </label>
                <textarea
                  {...register('direccion')}
                  rows="3"
                  className="input-field"
                  placeholder="Ingresa tu dirección completa"
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
                  className="input-field"
                  placeholder="Información adicional que consideres importante"
                />
              </div>

              {/* Botón de Envío */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3 text-lg"
                >
                  Enviar Solicitud de Afiliación
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Beneficios de Afiliación */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué afiliarte a ASODAT?
            </h2>
            <p className="text-lg text-gray-600">
              Descubre todos los beneficios que obtienes al ser parte de nuestra asociación
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-asodat-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <HeartIcon className="h-8 w-8 text-asodat-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bienestar Integral</h3>
              <p className="text-gray-600">
                Cobertura médica, asistencia social y programas de bienestar para ti y tu familia.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-asodat-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AcademicCapIcon className="h-8 w-8 text-asodat-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Desarrollo Profesional</h3>
              <p className="text-gray-600">
                Capacitación continua, networking y oportunidades de crecimiento profesional.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-asodat-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <UsersIcon className="h-8 w-8 text-asodat-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidad Unida</h3>
              <p className="text-gray-600">
                Forma parte de una comunidad solidaria que vela por los intereses de todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ASODAT</h3>
              <p className="text-gray-400">
                Asociación de Docentes, Personal Administrativo y Trabajadores de la ESPE sede Latacunga.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/servicios" className="hover:text-white">Servicios</a></li>
                <li><a href="/afiliacion" className="hover:text-white">Afiliación</a></li>
                <li><a href="/noticias" className="hover:text-white">Noticias</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>ESPE Sede Latacunga</li>
                <li>Latacunga, Ecuador</li>
                <li>info@asodat.espe.edu.ec</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 ASODAT. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Afiliacion; 