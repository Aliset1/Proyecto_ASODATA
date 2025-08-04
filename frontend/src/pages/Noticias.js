import React from 'react';
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

const Noticias = () => {
  const noticias = [
    {
      id: 1,
      titulo: 'ASODAT Celebra su Segundo Aniversario',
      contenido: 'La Asociación de Docentes, Personal Administrativo y Trabajadores de la ESPE sede Latacunga celebró su segundo aniversario con un evento especial que reunió a más de 150 socios.',
      categoria: 'Eventos',
      fecha: '2025-01-15',
      autor: 'Comité Directivo',
      imagen: '/img/evento-aniversario.jpg'
    },
    {
      id: 2,
      titulo: 'Nuevos Beneficios Médicos para Socios',
      contenido: 'A partir de este mes, todos nuestros socios tendrán acceso a descuentos especiales en consultas médicas y medicamentos en farmacias afiliadas.',
      categoria: 'Beneficios',
      fecha: '2025-01-10',
      autor: 'Departamento de Beneficios',
      imagen: '/img/beneficios-medicos.jpg'
    },
    {
      id: 3,
      titulo: 'Capacitación en Gestión de Proyectos',
      contenido: 'Se realizará un taller gratuito sobre gestión de proyectos para todos los socios interesados en mejorar sus habilidades profesionales.',
      categoria: 'Capacitación',
      fecha: '2025-01-08',
      autor: 'Comité de Capacitación',
      imagen: '/img/capacitacion.jpg'
    },
    {
      id: 4,
      titulo: 'Resultados de la Asamblea General',
      contenido: 'Se presentan los resultados de la última asamblea general donde se aprobaron importantes cambios en los estatutos de la asociación.',
      categoria: 'Institucional',
      fecha: '2025-01-05',
      autor: 'Secretaría General',
      imagen: '/img/asamblea.jpg'
    },
    {
      id: 5,
      titulo: 'Programa de Mentorías Profesionales',
      contenido: 'Lanzamos nuestro nuevo programa de mentorías donde socios experimentados guiarán a nuevos miembros en su desarrollo profesional.',
      categoria: 'Desarrollo',
      fecha: '2025-01-03',
      autor: 'Comité de Desarrollo',
      imagen: '/img/mentorias.jpg'
    },
    {
      id: 6,
      titulo: 'Convenio con Universidad Nacional',
      contenido: 'ASODAT firma un convenio estratégico con la Universidad Nacional que beneficiará a todos nuestros socios con descuentos en programas de posgrado.',
      categoria: 'Convenios',
      fecha: '2024-12-28',
      autor: 'Comité de Relaciones',
      imagen: '/img/convenio.jpg'
    }
  ];

  const categorias = ['Todas', 'Eventos', 'Beneficios', 'Capacitación', 'Institucional', 'Desarrollo', 'Convenios'];

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
              <a href="/afiliacion" className="text-gray-500 hover:text-asodat-600">Afiliación</a>
              <a href="/noticias" className="text-asodat-600 font-medium">Noticias</a>
              <a href="/login" className="btn-primary">Iniciar Sesión</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Noticias y</span>
            <span className="block text-asodat-600">Actualizaciones</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Mantente informado sobre las últimas noticias, eventos y beneficios de ASODAT.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700 hover:text-asodat-600"
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia) => (
              <article key={noticia.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200?text=ASODAT';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-asodat-100 text-asodat-800">
                      {noticia.categoria}
                    </span>
                    <span className="text-xs text-gray-500">
                      <CalendarIcon className="h-3 w-3 inline mr-1" />
                      {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {noticia.titulo}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {noticia.contenido}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {noticia.autor}
                    </div>
                    <button className="text-asodat-600 hover:text-asodat-700 text-sm font-medium">
                      Leer más →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-asodat-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Quieres recibir nuestras noticias?
          </h2>
          <p className="text-xl text-asodat-100 mb-8">
            Suscríbete a nuestro boletín y recibe las últimas noticias directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-asodat-600"
            />
            <button className="bg-white text-asodat-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Suscribirse
            </button>
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

export default Noticias; 