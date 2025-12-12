# UniTask - Presentación Final

## Gestión de Tareas Académicas

**Diseño de Contenido para Interfaces de Usuario**  
Universidad del Valle - Sede Tuluá  
Diciembre 2025

---

# 📌 Agenda

1. Introducción
2. Investigación y Hallazgos
3. Proceso de Diseño
4. Pruebas de Usabilidad
5. Conclusiones
6. Demostración del Prototipo

---

# 1. Introducción

---

## El Problema

### ¿Qué enfrentan los estudiantes universitarios?

- 📚 Múltiples tareas de diferentes materias
- 📅 Fechas límite dispersas y difíciles de recordar
- 😰 Estrés por desorganización
- ❌ Entregas tardías u olvidadas
- 📉 Impacto negativo en el rendimiento académico

---

## La Solución: UniTask

### Una aplicación web para gestionar tareas académicas

**¿Qué es UniTask?**

> Una herramienta diseñada específicamente para estudiantes que permite organizar, priorizar y dar seguimiento a sus tareas académicas.

---

## Funcionalidades de UniTask

| Módulo | Funcionalidad | Descripción |
|--------|---------------|-------------|
| 🔐 **Autenticación** | Login / Registro | Acceso seguro con usuario y contraseña |
| 📚 **Materias** | Crear materia | Agregar asignaturas con nombre, color e icono |
| | Editar materia | Modificar información de la materia |
| | Eliminar materia | Borrar materias existentes |
| ✅ **Tareas** | Crear tarea | Nueva tarea con título, descripción, materia, prioridad y fecha |
| | Editar tarea | Modificar cualquier campo de la tarea |
| | Eliminar tarea | Borrar tareas existentes |
| | Completar tarea | Marcar como completada con checkbox |
| | Filtrar tareas | Ver todas, pendientes o completadas |
| 📋 **Kanban** | Vista tablero | 3 columnas: Pendientes, En Proceso, Completadas |
| | Drag & Drop | Arrastrar tareas entre columnas |
| | Cambio de estado | Actualización automática al mover |
| 📅 **Calendario** | Vista mensual | Navegación entre meses |
| | Tareas por fecha | Ver tareas en su fecha límite |
| | Código de colores | Prioridad visual (rojo, amarillo, azul) |
| 📊 **Estadísticas** | Métricas generales | Total, completadas, pendientes, vencidas |
| | Tasa de cumplimiento | Barra de progreso porcentual |
| | Por materia | Estadísticas individuales |
| 🎨 **Personalización** | Modo Claro/Oscuro | Toggle en sidebar, persistente |
| 🔔 **Notificaciones** | Toast messages | Feedback visual de acciones (éxito, error, info) |

---

## Objetivos del Proyecto

| Objetivo | Descripción |
|----------|-------------|
| 🎯 **Principal** | Desarrollar una app de gestión de tareas académicas |
| 📱 **Usabilidad** | Interfaz intuitiva y fácil de usar |
| ✨ **Experiencia** | Diseño moderno y atractivo |
| 📊 **Seguimiento** | Visualizar progreso académico |

---

## Tecnologías Utilizadas

| Frontend | Backend | Base de Datos | Despliegue |
|----------|---------|---------------|------------|
| React.js | Node.js | PostgreSQL | Docker |
| Tailwind CSS | Express | — | Nginx |
| Vite | bcrypt | — | — |

---

# 2. Investigación y Hallazgos

---

## Perfil de Usuario

### ¿Para quién diseñamos?

| Característica | Detalle |
|----------------|---------|
| **Edad** | 18-28 años |
| **Ocupación** | Estudiantes universitarios |
| **Dispositivos** | Laptop, smartphone |
| **Habilidad técnica** | Media-Alta |
| **Contexto de uso** | Casa, universidad, transporte |

---

## Necesidades Identificadas

### Lo que los usuarios realmente necesitan:

1. 👁️ **Ver todo de un vistazo** — Dashboard con resumen
2. 🏷️ **Organizar por materia** — Colores y categorías
3. ⏰ **No olvidar fechas** — Calendario visual
4. 🔢 **Saber qué hacer primero** — Sistema de prioridades
5. 📈 **Conocer su progreso** — Estadísticas

---

## Análisis de Competencia

| App | ✅ Fortalezas | ❌ Debilidades |
|-----|---------------|----------------|
| **Todoist** | Interfaz limpia | Sin enfoque académico |
| **Notion** | Muy flexible | Curva de aprendizaje alta |
| **Google Tasks** | Integración Google | Muy limitado |
| **My Study Life** | Enfoque académico | Interfaz anticuada |

### 💡 Oportunidad
Combinar la **simplicidad de Todoist** con el **enfoque académico de My Study Life**

---

## Requisitos Funcionales

| Código | Requisito | Prioridad |
|--------|-----------|-----------|
| RF-01 | Autenticación de usuarios | 🔴 Alta |
| RF-02 | Gestión de materias | 🔴 Alta |
| RF-03 | Gestión de tareas | 🔴 Alta |
| RF-04 | Vista calendario | 🔴 Alta |
| RF-05 | Tablero Kanban | 🟡 Media |
| RF-06 | Estadísticas | 🟡 Media |
| RF-07 | Modo claro/oscuro | 🟡 Media |
| RF-08 | Notificaciones toast | 🟡 Media |

---

# 3. Proceso de Diseño

---

## Metodología: Diseño Centrado en el Usuario

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Investigar   │ →  │   Idear      │ →  │  Prototipar  │
│              │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
                                               │
       ┌───────────────────────────────────────┘
       ↓
┌──────────────┐    ┌──────────────┐
│   Probar     │ →  │   Iterar     │
│              │    │              │
└──────────────┘    └──────────────┘
```

---

## Arquitectura de Información

```
UniTask
├── 🏠 Inicio (Dashboard)
│   ├── Estadísticas rápidas
│   └── Tareas recientes
├── 📚 Gestión Académica
│   ├── Tareas
│   └── Materias
├── 📋 Tablero Kanban
│   ├── Pendientes
│   ├── En Proceso
│   └── Completadas
├── 📅 Calendario
└── 📊 Estadísticas
```

---

## Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| 🔵 Azul Índigo | `#6366F1` | Botones principales, accent |
| 🟢 Verde | `#22C55E` | Éxito, completado |
| 🟡 Amarillo | `#F59E0B` | Advertencia, prioridad media |
| 🔴 Rojo | `#EF4444` | Error, prioridad alta |
| ⬛ Gris oscuro | `#0E1111` | Fondo modo oscuro |
| ⬜ Gris claro | `#F3F4F6` | Fondo modo claro |

**Justificación:** Alto contraste para accesibilidad + colores semánticos intuitivos

---

## Tipografía

### Fuente: Inter

| Uso | Tamaño | Peso |
|-----|--------|------|
| Títulos | 36px | Bold |
| Subtítulos | 24px | Semibold |
| Texto normal | 16px | Regular |
| Texto secundario | 14px | Regular |

**¿Por qué Inter?**
- Diseñada para pantallas
- Excelente legibilidad
- Soporte para múltiples idiomas

---

## Componentes de UI

### Sistema de componentes reutilizables

| Componente | Descripción |
|------------|-------------|
| **Card** | Contenedor con sombra y bordes redondeados |
| **Button** | Variantes: primary, secondary, success, danger |
| **Input** | Campos con label y validación |
| **Modal** | Ventana flotante para formularios |
| **Toast** | Notificaciones temporales |
| **PriorityBadge** | Indicador visual de prioridad |

---

## Pantallas Principales

### 1. Login / Registro
- Formulario limpio y centrado
- Toggle entre iniciar sesión y registrarse
- Validación de campos

### 2. Dashboard (Inicio)
- Saludo personalizado
- 4 tarjetas de estadísticas
- Tareas recientes
- Accesos rápidos

---

## Pantallas Principales (cont.)

### 3. Gestión de Tareas
- Lista filtrable (todas/pendientes/completadas)
- Checkbox para completar
- Badge de prioridad con colores
- Modal para crear/editar

### 4. Tablero Kanban
- 3 columnas: Pendientes, En Proceso, Completadas
- Drag & Drop para mover tareas
- Contador por columna

---

## Pantallas Principales (cont.)

### 5. Calendario
- Vista mensual navegable
- Tareas en su fecha correspondiente
- Código de color por prioridad
- Leyenda visual

### 6. Estadísticas
- Métricas clave (total, completadas, pendientes, vencidas)
- Barra de progreso de cumplimiento
- Distribución porcentual
- Estadísticas por materia

---

## Modo Claro / Oscuro

| Elemento | ☀️ Modo Claro | 🌙 Modo Oscuro |
|----------|---------------|----------------|
| Fondo | `#F3F4F6` | `#0E1111` |
| Cards | `#FFFFFF` | `#232B2B` |
| Texto | `#1F2937` | `#F3F4F6` |
| Bordes | `#E5E7EB` | `#353839` |

**Implementación:** Tailwind CSS con `darkMode: 'class'`  
**Persistencia:** localStorage

---

## Sistema de Notificaciones

### Toast Notifications

| Tipo | Icono | Color | Uso |
|------|-------|-------|-----|
| ✅ Éxito | Check | Verde | Acciones completadas |
| ❌ Error | X | Rojo | Fallos |
| ⚠️ Advertencia | Alerta | Amarillo | Alertas |
| ℹ️ Info | Info | Azul | Información |

- Posición: Esquina inferior derecha
- Duración: 4 segundos
- Cierre manual disponible

---

# 4. Pruebas de Usabilidad

---

## Metodología de Pruebas

| Aspecto | Detalle |
|---------|---------|
| **Tipo** | Pruebas moderadas |
| **Participantes** | 5 estudiantes universitarios |
| **Duración** | 20-30 min por sesión |
| **Métricas** | Tasa de éxito, tiempo, errores, satisfacción |

---

## Tareas Evaluadas

| # | Tarea | Objetivo |
|---|-------|----------|
| 1 | Registrarse | Completar sin ayuda |
| 2 | Crear materia | Materia creada |
| 3 | Crear tarea prioritaria | Tarea visible |
| 4 | Completar tarea | Estado actualizado |
| 5 | Mover en Kanban | Drag & drop exitoso |
| 6 | Cambiar tema | Modo cambiado |
| 7 | Ver estadísticas | Acceso correcto |

---

## Resultados

| Tarea | ✅ Éxito | ⏱️ Tiempo | ❌ Errores |
|-------|----------|-----------|-----------|
| Registro | 100% | 45s | 0.2 |
| Crear materia | 100% | 30s | 0 |
| Crear tarea | 100% | 40s | 0.4 |
| Completar tarea | 100% | 5s | 0 |
| Kanban D&D | 80% | 15s | 0.6 |
| Cambiar tema | 100% | 8s | 0 |
| Estadísticas | 100% | 10s | 0 |

---

## Puntuación de Usabilidad

### System Usability Scale (SUS)

# 82/100

| Rango | Calificación |
|-------|--------------|
| < 50 | ❌ Pobre |
| 50-70 | 🟡 OK |
| 70-85 | ✅ **Bueno** |
| > 85 | 🌟 Excelente |

**UniTask: ✅ BUENO - Experiencia de usuario satisfactoria**

---

## Problemas y Soluciones

| Problema | Severidad | Solución |
|----------|-----------|----------|
| Drag & drop confuso en móvil | 🟡 Media | Agregar instrucciones visuales |
| Prioridades poco visibles | 🔵 Baja | Mejorar contraste y agregar emojis |
| Botón crear poco visible | 🟡 Media | Aumentar tamaño y color |

---

# 5. Conclusiones

---

## Objetivos Cumplidos

| Objetivo | Estado |
|----------|--------|
| ✅ App funcional de gestión de tareas | Completado |
| ✅ Interfaz intuitiva (SUS 82/100) | Completado |
| ✅ Diseño moderno y atractivo | Completado |
| ✅ Sistema de seguimiento | Completado |
| ✅ Modo claro/oscuro | Completado |
| ✅ Tablero Kanban | Completado |

---

## Lecciones Aprendidas

### 💡 Lo que aprendimos:

1. **Iterar es clave** — El feedback real mejora el producto
2. **Componentes reutilizables** — Aceleran el desarrollo
3. **Pruebas tempranas** — Evitan retrabajo costoso
4. **Diseño centrado en el usuario** — Garantiza adopción
5. **Accesibilidad importa** — Modo oscuro y contrastes

---

## Mejoras Futuras

| Prioridad | Mejora | Beneficio |
|-----------|--------|-----------|
| 🔴 Alta | Notificaciones push | Recordatorios proactivos |
| 🔴 Alta | Modo offline | Uso sin conexión |
| 🟡 Media | Integración Google Calendar | Sincronización |
| 🟡 Media | App móvil nativa | Mejor experiencia |
| 🔵 Baja | Gamificación | Mayor engagement |

---

## Impacto Esperado

### Con UniTask, los estudiantes pueden:

- 📉 **Reducir entregas tardías** en un 40%
- 📚 **Mejorar organización** académica
- 😌 **Disminuir estrés** por sobrecarga
- 📈 **Aumentar productividad** estudiantil

---

# 6. Demostración del Prototipo

---

## Demo en Vivo

### Flujo a demostrar:

1. **Login** — Acceder a la aplicación
2. **Dashboard** — Ver estadísticas y tareas recientes
3. **Crear Materia** — Agregar una nueva asignatura
4. **Crear Tarea** — Nueva tarea con prioridad
5. **Tablero Kanban** — Mover tareas entre columnas
6. **Calendario** — Ver tareas por fecha
7. **Estadísticas** — Revisar progreso
8. **Modo Oscuro/Claro** — Cambiar tema

---

## Acceso al Prototipo

### 🌐 URLs de Acceso

| Recurso | Enlace |
|---------|--------|
| **Aplicación** | `http://localhost:3000` |
| **Figma** | [Link al prototipo](#) |
| **Repositorio** | [GitHub](#) |

---

# ¿Preguntas?

## ¡Gracias por su atención!

---

### Equipo UniTask
**Universidad del Valle - Sede Tuluá**  
**Diciembre 2025**

---

# Anexos

---

## Anexo: Arquitectura Técnica

```
┌─────────────────────────────────────┐
│            FRONTEND                 │
│  React + Tailwind + Context API    │
└─────────────────┬───────────────────┘
                  │ HTTP/REST
┌─────────────────┴───────────────────┐
│            BACKEND                  │
│     Express + Node.js + bcrypt     │
└─────────────────┬───────────────────┘
                  │ SQL
┌─────────────────┴───────────────────┐
│          BASE DE DATOS              │
│           PostgreSQL                │
└─────────────────────────────────────┘
```

---

## Anexo: Estructura del Proyecto

```
unitask/src/
├── context/           # Auth, Theme, Toast
├── data/
│   ├── models/        # Task, Subject, User
│   └── repositories/  # Acceso a datos
├── infrastructure/
│   ├── api/           # Cliente HTTP
│   └── config/        # Configuración
└── presentation/
    ├── components/    # UI Components
    └── pages/         # Páginas
```

---

## Anexo: Modelo de Datos

```
┌─────────────┐     ┌─────────────┐
│   users     │     │  subjects   │
├─────────────┤     ├─────────────┤
│ id          │     │ id          │
│ username    │     │ name        │
│ name        │     │ color       │
│ email       │     │ icon        │
│ password    │     └──────┬──────┘
└─────────────┘            │ 1:N
                    ┌──────┴──────┐
                    │   tasks     │
                    ├─────────────┤
                    │ id          │
                    │ title       │
                    │ subject_id  │
                    │ priority    │
                    │ due_date    │
                    │ status      │
                    │ completed   │
                    └─────────────┘
```
