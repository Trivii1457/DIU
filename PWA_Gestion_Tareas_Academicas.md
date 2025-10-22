# 📚 Proyecto: PWA para Gestión de Tareas Académicas
**Nombre tentativo:** UniTask, StudyFlow, o FocusU  
**Tipo:** PWA Responsive  
**Plataforma objetivo:** Navegadores modernos (Chrome, Edge, Firefox, Safari)  
**Usuarios:** Estudiantes universitarios  

---

## 🧩 1. Requisitos del Sistema

### ⚙️ Requisitos funcionales
| Código | Requisito | Descripción |
|--------|------------|--------------|
| RF-01 | Registro y autenticación | El usuario podrá crear una cuenta y autenticarse mediante correo electrónico o cuenta Google. |
| RF-02 | Gestión de materias | El usuario podrá agregar, editar y eliminar materias o cursos. |
| RF-03 | Creación de tareas | El usuario podrá crear tareas con nombre, descripción, materia, prioridad y fecha límite. |
| RF-04 | Recordatorios | La aplicación enviará notificaciones (push o locales) antes de las fechas límite. |
| RF-05 | Vista calendario | El usuario podrá visualizar sus tareas organizadas por día, semana o mes. |
| RF-06 | Marcar tareas como completadas | El usuario podrá marcar una tarea como terminada, y el progreso se reflejará visualmente. |
| RF-07 | Filtrado y búsqueda | Se podrán filtrar las tareas por materia, prioridad o estado (pendiente/completada). |
| RF-08 | Sincronización con almacenamiento local | La PWA almacenará los datos localmente (IndexedDB o LocalStorage) y los sincronizará cuando haya conexión. |
| RF-09 | Modo oscuro | La aplicación adaptará los colores automáticamente según la preferencia del sistema o manualmente. |
| RF-10 | Modo offline | El usuario podrá acceder a sus tareas aunque no tenga conexión a internet. |
| RF-11 | Instalación PWA | La aplicación podrá instalarse en el dispositivo como una app independiente. |

---

### 🧱 Requisitos no funcionales
| Código | Requisito | Descripción |
|--------|------------|--------------|
| RNF-01 | Usabilidad | La interfaz debe ser simple, intuitiva y con una curva de aprendizaje baja. |
| RNF-02 | Rendimiento | Los tiempos de carga inicial no deben superar los 2 segundos en conexión 4G. |
| RNF-03 | Accesibilidad | Cumplir con WCAG 2.1 nivel AA (contraste, texto alternativo, navegación por teclado). |
| RNF-04 | Compatibilidad | Funcionar correctamente en navegadores modernos y distintos tamaños de pantalla. |
| RNF-05 | Diseño responsive | La interfaz debe adaptarse a móviles, tablets y pantallas de escritorio sin perder legibilidad. |
| RNF-06 | Seguridad | Encriptar contraseñas, usar HTTPS y proteger la información del usuario. |
| RNF-07 | Escalabilidad | La arquitectura debe permitir agregar futuras integraciones (por ejemplo, Google Calendar). |

---

## 📱 2. Funcionalidades Detalladas

### 🧾 a) Panel Principal (“Hoy”)
- Muestra las tareas del día.  
- Opción de marcar tareas como completadas.  
- Barra de progreso visual del día.  
- Acceso rápido para crear nuevas tareas.

---

### 📅 b) Calendario de Tareas
- Vista semanal y mensual.  
- Eventos codificados por color según la materia.  
- Posibilidad de arrastrar y soltar (drag & drop) para reprogramar tareas.  

---

### 🏷️ c) Gestión de Materias
- Crear materias con color e ícono distintivo.  
- Mostrar progreso de tareas por materia (porcentaje de avance).  
- Opción para archivar materias pasadas.

---

### 🔔 d) Sistema de Notificaciones
- Recordatorios automáticos antes de la fecha límite.  
- Notificaciones push si la PWA está instalada.  
- Configuración personalizada de avisos (ej. 1 día antes, 1 hora antes).

---

### 🧭 e) Buscador y Filtros
- Búsqueda por palabra clave.  
- Filtro por materia, prioridad, o estado.  
- Posibilidad de combinar filtros (por ejemplo: “Alta prioridad” + “Pendiente”).  

---

### 🌗 f) Personalización de Interfaz
- Modo claro / oscuro automático o manual.  
- Elección de color principal de la app.  
- Configuración de idioma (español / inglés).  

---

### 💾 g) Sincronización y almacenamiento
- Guardado automático en **IndexedDB** o **LocalStorage**.  
- Sincronización en la nube (opcional, con login).  
- Recuperación automática tras reconexión a internet.  

---

### 🧑‍💻 h) Instalación como App (PWA)
- Archivo **manifest.json** para instalación.  
- Service Worker para manejo de caché y modo offline.  
- Iconos personalizados y splash screen adaptable.  

---

## 🎨 3. Lineamientos de Diseño (UI/UX)

| Elemento | Descripción |
|-----------|-------------|
| **Estilo visual** | Minimalista, limpio, con jerarquía visual clara. |
| **Colores base** | Azul (#2563EB), Blanco (#F9FAFB), Gris medio (#9CA3AF), Verde éxito (#22C55E). |
| **Tipografía** | *Inter* o *Poppins*, tamaño legible y buen espaciado. |
| **Iconografía** | *Material Symbols* o *Feather Icons*. |
| **Layout** | Basado en tarjetas (cards) con sombras suaves y bordes redondeados. |
| **Navegación** | Barra inferior (móvil) o lateral (desktop). |
| **Feedback visual** | Animaciones suaves al completar tareas. |

---

## 🧠 4. Tecnologías Sugeridas

| Categoría | Tecnología |
|------------|-------------|
| Frontend | React.js, Vue.js o Svelte |
| Estilos | Tailwind CSS, CSS Grid/Flexbox |
| PWA | Service Workers, Manifest.json, Workbox |
| Almacenamiento local | IndexedDB, LocalStorage |
| Notificaciones | Web Push API |
| Accesibilidad | ARIA roles, WCAG 2.1 |
| Prototipado | Figma (para diseño UI y flujo de usuario) |

---

## 🚀 5. Posibles Extensiones Futuras

- Integración con **Google Calendar** o **Microsoft Outlook**.  
- Sistema de logros y recompensas (gamificación).  
- Sincronización entre dispositivos (cuenta en la nube).  
- Panel para docentes que quieran compartir actividades.  
- Asistente de voz o chatbot para gestión rápida.  
