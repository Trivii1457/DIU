# 🎓 UniTask - PWA para Gestión de Tareas Académicas

PWA moderna y responsive para la gestión eficiente de tareas y proyectos académicos, desarrollada con React, Vite, Tailwind CSS y PostgreSQL.

## 🐳 Ejecución con Docker (Recomendado)

La forma más fácil de ejecutar el proyecto es usando Docker Compose:

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener todos los servicios
docker-compose down

# Detener y eliminar datos
docker-compose down -v
```

Una vez iniciado, accede a:
- **Frontend:** http://localhost
- **Backend API:** http://localhost:3001/api
- **PostgreSQL:** localhost:5432

### Credenciales de Demo
- **Usuario:** demo
- **Contraseña:** demo123

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado en tres servicios principales:

```
.
├── backend/                 # API REST con Node.js/Express
│   ├── src/
│   │   ├── db/             # Conexión y configuración de PostgreSQL
│   │   ├── routes/         # Rutas de la API
│   │   └── index.js        # Servidor Express
│   └── Dockerfile
│
├── unitask/                # Frontend React PWA
│   ├── src/
│   │   ├── presentation/   # Componentes y páginas UI
│   │   ├── data/          # Modelos y repositorios
│   │   ├── context/       # Contexto de React (Auth)
│   │   └── infrastructure/ # Cliente API
│   └── Dockerfile
│
└── docker-compose.yml      # Orquestación de servicios
```

### Servicios Docker
- **postgres:** Base de datos PostgreSQL 16 (Alpine)
- **backend:** API REST Node.js 22 (Alpine)
- **frontend:** React + Nginx (Alpine)

## 🚀 Tecnologías

- **Frontend:** React 19 + Vite
- **Backend:** Node.js + Express
- **Base de Datos:** PostgreSQL 16
- **Estilos:** Tailwind CSS
- **PWA:** vite-plugin-pwa + Workbox
- **Routing:** React Router DOM
- **Contenedores:** Docker + Docker Compose (Alpine images)

## 📦 Desarrollo Local (Sin Docker)

### Backend

```bash
cd backend
npm install

# Asegúrate de tener PostgreSQL corriendo localmente
# Configura las variables de entorno:
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=unitask
export DB_USER=unitask
export DB_PASSWORD=unitask

npm run dev
```

### Frontend

```bash
cd unitask
npm install
npm run dev
```

## 🗄️ Base de Datos

### Tablas
- **users:** Almacena usuarios del sistema
- **subjects:** Almacena las materias/cursos
- **tasks:** Almacena todas las tareas (con FK a subjects)

### API Endpoints

#### Users
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `POST /api/users/authenticate` - Autenticar usuario

#### Subjects
- `GET /api/subjects` - Listar materias
- `GET /api/subjects/active` - Listar materias activas
- `POST /api/subjects` - Crear materia
- `PUT /api/subjects/:id` - Actualizar materia
- `DELETE /api/subjects/:id` - Eliminar materia

#### Tasks
- `GET /api/tasks` - Listar tareas
- `GET /api/tasks/filter/pending` - Tareas pendientes
- `GET /api/tasks/filter/completed` - Tareas completadas
- `GET /api/tasks/stats/summary` - Estadísticas
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

## ✨ Características

- ✅ Gestión completa de tareas (CRUD)
- ✅ Gestión de materias/cursos
- ✅ Sistema de autenticación
- ✅ Vista de calendario
- ✅ Estadísticas de progreso
- ✅ Base de datos relacional (PostgreSQL)
- ✅ API REST completa
- ✅ Dockerizado con imágenes Alpine
- ✅ PWA instalable y offline

## 🎨 Sistema de Diseño

### Colores Principales
- **Primary:** #2563EB (Azul)
- **Success:** #22C55E (Verde)
- **Background Light:** #F9FAFB
- **Background Dark:** #111827

## 📄 Licencia

Este proyecto es parte del curso de Diseño de Contenido para Interfaces de Usuario - Universidad del Valle.

---

**Desarrollado con ❤️ para estudiantes universitarios**
