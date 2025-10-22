# 🎓 UniTask - PWA para Gestión de Tareas Académicas

PWA moderna y responsive para la gestión eficiente de tareas y proyectos académicos, desarrollada con React, Vite, Tailwind CSS e IndexedDB.

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado por capas siguiendo principios de Clean Architecture:

```
src/
├── 📱 presentation/          # Capa de Presentación (UI/UX)
│   ├── components/
│   │   ├── common/          # Componentes reutilizables
│   │   ├── tasks/           # Componentes de tareas
│   │   └── subjects/        # Componentes de materias
│   ├── layouts/             # Layouts de la aplicación
│   └── pages/               # Páginas/Vistas principales
│
├── 🧠 application/           # Lógica de Aplicación
│   ├── hooks/               # Custom hooks de React
│   ├── services/            # Servicios de aplicación
│   └── store/               # Estado global (context/zustand)
│
├── 🗄️ data/                 # Capa de Datos
│   ├── database/            # Configuración de IndexedDB
│   ├── models/              # Modelos de datos
│   └── repositories/        # Repositorios (CRUD)
│
└── ⚙️ infrastructure/        # Infraestructura
    ├── config/              # Configuraciones
    ├── pwa/                 # Service Workers y PWA
    └── utils/               # Utilidades y helpers
```

## 🚀 Tecnologías

- **Frontend:** React 18 + Vite
- **Estilos:** Tailwind CSS
- **Base de Datos:** IndexedDB (con Dexie.js)
- **PWA:** vite-plugin-pwa + Workbox
- **Routing:** React Router DOM
- **Utilidades:** date-fns, clsx

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de producción
npm run preview
```

## ✨ Características Implementadas

### ✅ Fase 1 - Base del Proyecto
- [x] Estructura de carpetas por capas
- [x] Configuración de Tailwind CSS
- [x] Configuración PWA con Workbox
- [x] Base de datos IndexedDB con Dexie
- [x] Modelos de datos (Task, Subject)
- [x] Repositorios CRUD completos
- [x] Componentes UI base (Button, Card, Input, etc.)
- [x] Página de inicio funcional
- [x] Sistema de estadísticas

### 🔜 Próximas Fases
- [ ] Sistema de autenticación
- [ ] Vista de calendario
- [ ] Sistema de notificaciones
- [ ] Modo oscuro/claro
- [ ] Filtros y búsqueda avanzada
- [ ] Drag & drop para tareas
- [ ] Sincronización en la nube
- [ ] Integración con Google Calendar

## 🎨 Sistema de Diseño

### Colores Principales
- **Primary:** #2563EB (Azul)
- **Success:** #22C55E (Verde)
- **Background Light:** #F9FAFB
- **Background Dark:** #111827

### Tipografía
- **Fuente:** Inter (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700

## 📱 PWA Features

- ✅ Instalable como app nativa
- ✅ Funciona offline
- ✅ Caché inteligente con Workbox
- ✅ Actualización automática
- 🔜 Notificaciones push
- 🔜 Sincronización en background

## 🗄️ Base de Datos

La aplicación utiliza IndexedDB para almacenamiento local persistente:

### Tablas
- **tasks:** Almacena todas las tareas
- **subjects:** Almacena las materias/cursos

### Características
- CRUD completo
- Consultas optimizadas
- Índices para búsquedas rápidas
- Datos de ejemplo precargados

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Preview de producción
npm run lint         # Linter de código
```

## 📄 Licencia

Este proyecto es parte del curso de Diseño de Contenido para Interfaces de Usuario - Universidad del Valle.

---

**Desarrollado con ❤️ para estudiantes universitarios**
