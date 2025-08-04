# 🚀 Frontend ASODAT - React

Este es el frontend moderno del sistema ASODAT desarrollado con React, reemplazando la interfaz PHP original.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca principal
- **React Router DOM** - Navegación
- **React Query** - Gestión de estado del servidor
- **React Hook Form** - Formularios
- **Tailwind CSS** - Estilos
- **Heroicons** - Iconografía
- **Recharts** - Gráficos
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificaciones

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.js       # Layout principal con sidebar
│   └── ProtectedRoute.js # Protección de rutas
├── contexts/           # Contextos de React
│   └── AuthContext.js  # Contexto de autenticación
├── pages/              # Páginas de la aplicación
│   ├── Dashboard.js    # Dashboard principal
│   ├── Login.js        # Página de login
│   ├── Socios.js       # Gestión de socios
│   └── ...
├── services/           # Servicios y APIs
│   └── api.js         # Cliente HTTP
└── index.css          # Estilos globales
```

## 🔐 Autenticación

El sistema utiliza un contexto de autenticación que maneja:

- Login/logout de usuarios
- Persistencia de sesión
- Protección de rutas por roles
- Interceptores de API para tokens

## 🎨 Diseño

- **Responsive**: Adaptado para móviles y desktop
- **Moderno**: UI/UX actual con Tailwind CSS
- **Accesible**: Cumple estándares de accesibilidad
- **Consistente**: Sistema de diseño unificado

## 📊 Funcionalidades

### Páginas Públicas
- **Home**: Página principal con información de ASODAT
- **Login**: Autenticación de usuarios
- **Servicios**: Información de servicios
- **Afiliación**: Proceso de afiliación
- **Noticias**: Blog de noticias

### Páginas Protegidas
- **Dashboard**: Panel principal con estadísticas
- **Socios**: Gestión CRUD de socios
- **Aportes**: Control de aportes mensuales
- **Reportes**: Generación de reportes
- **Datos**: Información personal del usuario
- **Historial**: Historial de aportes

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env`:

```env
REACT_APP_API_URL=http://localhost:8000
```

### Proxy

El proyecto está configurado para hacer proxy a `http://localhost:8000` (backend PHP).

## 🚀 Despliegue

### Desarrollo
```bash
npm start
```

### Producción
```bash
npm run build
```

Los archivos generados se encuentran en `build/` y pueden ser servidos por cualquier servidor web.

## 📱 Características Responsive

- **Mobile First**: Diseño optimizado para móviles
- **Sidebar**: Navegación colapsable en móviles
- **Tablas**: Scroll horizontal en dispositivos pequeños
- **Formularios**: Campos adaptados a pantallas táctiles

## 🎯 Mejoras Implementadas

### Comparado con PHP Original:
- ✅ **Interfaz moderna** con Tailwind CSS
- ✅ **Navegación SPA** sin recargas
- ✅ **Estado reactivo** con React Query
- ✅ **Validación en tiempo real** de formularios
- ✅ **Notificaciones elegantes** con toast
- ✅ **Gráficos interactivos** con Recharts
- ✅ **Responsive design** completo
- ✅ **Código modular** y mantenible
- ✅ **TypeScript ready** (fácil migración)
- ✅ **Testing setup** incluido

## 🔄 Integración con Backend

El frontend se comunica con el backend PHP a través de:

- **REST API**: Endpoints JSON
- **Autenticación**: JWT tokens
- **CORS**: Configurado para desarrollo
- **Error Handling**: Manejo centralizado de errores

## 📈 Próximas Mejoras

- [ ] Implementar TypeScript
- [ ] Agregar tests unitarios
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Notificaciones push
- [ ] Exportación a Excel
- [ ] Filtros avanzados
- [ ] Búsqueda en tiempo real

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del sistema ASODAT y está bajo la misma licencia. 