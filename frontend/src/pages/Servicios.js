import React from 'react';
import {
  HeartIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const Servicios = () => {
  const servicios = [
    {
      icon: HeartIcon,
      title: 'Asistencia Médica',
      description: 'Cobertura médica integral para ti y tu familia con descuentos especiales en consultas, medicamentos y procedimientos médicos.',
      beneficios: [
        'Descuentos en consultas médicas',
        'Cobertura en medicamentos',
        'Atención dental preferencial',
        'Seguro de vida grupal'
      ]
    },
    {
      icon: AcademicCapIcon,
      title: 'Capacitación Continua',
      description: 'Programas de formación y desarrollo profesional para mantenerte actualizado en tu campo de trabajo.',
      beneficios: [
        'Cursos de especialización',
        'Talleres de desarrollo profesional',
        'Conferencias y seminarios',
        'Certificaciones técnicas'
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: 'Seguridad Social',
      description: 'Protección y beneficios sociales que garantizan tu bienestar y el de tu familia.',
      beneficios: [
        'Fondo de emergencias',
        'Apoyo en casos especiales',
        'Asesoría legal',
        'Beneficios por fallecimiento'
      ]
    },
    {
      icon: UsersIcon,
      title: 'Red de Contactos',
      description: 'Conecta con colegas y expande tu red profesional dentro de la comunidad universitaria.',
      beneficios: [
        'Eventos de networking',
        'Grupos de interés',
        'Mentorías profesionales',
        'Oportunidades de colaboración'
      ]
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Beneficios Financieros',
      description: 'Opciones de ahorro y crédito con condiciones preferenciales para nuestros socios.',
      beneficios: [
        'Préstamos con tasas preferenciales',
        'Programa de ahorro voluntario',
        'Descuentos en comercios afiliados',
        'Asesoría financiera'
      ]
    },
    {
      icon: ClockIcon,
      title: 'Recreación y Cultura',
      description: 'Actividades recreativas y culturales para mejorar la calidad de vida de nuestros miembros.',
      beneficios: [
        'Eventos deportivos',
        'Actividades culturales',
        'Viajes grupales',
        'Celebraciones institucionales'
      ]
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
              <a href="/" className="text-gray-500 hover:text-asodat-600">Inicio</a>
              <a href="/servicios" className="text-asodat-600 font-medium">Servicios</a>
              <a href="/afiliacion" className="text-gray-500 hover:text-asodat-600">Afiliación</a>
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
            <span className="block">Nuestros Servicios</span>
            <span className="block text-asodat-600">para el Bienestar</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Descubre todos los beneficios y servicios que ASODAT ofrece a sus miembros 
            para mejorar su calidad de vida y desarrollo profesional.
          </p>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-asodat-100 mb-4">
                    <servicio.icon className="h-6 w-6 text-asodat-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {servicio.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {servicio.description}
                  </p>
                  <ul className="space-y-2">
                    {servicio.beneficios.map((beneficio, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-asodat-600 mt-2"></div>
                        </div>
                        <span className="ml-3 text-sm text-gray-600">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-asodat-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Quieres disfrutar de estos beneficios?
          </h2>
          <p className="text-xl text-asodat-100 mb-8">
            Únete a ASODAT y accede a todos nuestros servicios y beneficios exclusivos.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/afiliacion" className="bg-white text-asodat-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Afíliate Ahora
            </a>
            <a href="/login" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-asodat-600 transition-colors">
              Iniciar Sesión
            </a>
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

export default Servicios; 