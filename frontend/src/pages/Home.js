import React from 'react';
import { Link } from 'react-router-dom';
import {
  UsersIcon,
  HeartIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const Home = () => {
  const servicios = [
    {
      icon: HeartIcon,
      title: 'Asistencia Médica',
      description: 'Cobertura médica integral para ti y tu familia con descuentos especiales.',
      color: 'text-red-600'
    },
    {
      icon: AcademicCapIcon,
      title: 'Capacitación Continua',
      description: 'Programas de formación y desarrollo profesional para mantenerte actualizado.',
      color: 'text-blue-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Seguridad Social',
      description: 'Protección y beneficios sociales que garantizan tu bienestar.',
      color: 'text-green-600'
    },
    {
      icon: UsersIcon,
      title: 'Red de Contactos',
      description: 'Conecta con colegas y expande tu red profesional.',
      color: 'text-purple-600'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Beneficios Financieros',
      description: 'Opciones de ahorro y crédito con condiciones preferenciales.',
      color: 'text-yellow-600'
    },
    {
      icon: CalendarIcon,
      title: 'Recreación y Cultura',
      description: 'Actividades recreativas y culturales para mejorar tu calidad de vida.',
      color: 'text-pink-600'
    }
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
              <a href="/" className="text-asodat-600 font-medium">Inicio</a>
              <a href="/servicios" className="text-gray-500 hover:text-asodat-600">Servicios</a>
              <a href="/afiliacion" className="text-gray-500 hover:text-asodat-600">Afiliación</a>
              <a href="/noticias" className="text-gray-500 hover:text-asodat-600">Noticias</a>
              <a href="/login" className="btn-primary">Iniciar Sesión</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Bienvenido a</span>
              <span className="block text-asodat-600">ASODAT</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Asociación de Docentes, Personal Administrativo y Trabajadores de la ESPE sede Latacunga. 
              Unidos por el bienestar y desarrollo profesional.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link to="/afiliacion" className="btn-primary px-8 py-3 text-lg">
                Afíliate Ahora
              </Link>
              <Link to="/servicios" className="btn-secondary px-8 py-3 text-lg">
                Conoce Nuestros Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600">
              Descubre todos los beneficios que ASODAT ofrece a sus miembros
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                  <servicio.icon className={`h-6 w-6 ${servicio.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {servicio.title}
                </h3>
                <p className="text-gray-600">
                  {servicio.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-20 bg-asodat-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              ASODAT en Números
            </h2>
            <p className="text-xl text-asodat-100">
              Una comunidad creciente y comprometida
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-asodat-100">Socios Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$15,000+</div>
              <div className="text-asodat-100">En Aportes Mensuales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-asodat-100">Soporte y Asistencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-asodat-100">Compromiso con Nuestros Socios</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para unirte a ASODAT?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a nuestra comunidad y disfruta de todos los beneficios que tenemos para ti y tu familia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/afiliacion" className="btn-primary px-8 py-3 text-lg">
              Afíliate Ahora
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-3 text-lg">
              Iniciar Sesión
            </Link>
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

export default Home; 