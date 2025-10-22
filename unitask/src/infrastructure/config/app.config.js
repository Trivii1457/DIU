/**
 * Configuración global de la aplicación
 */

export const APP_CONFIG = {
  name: 'UniTask',
  version: '1.0.0',
  description: 'PWA para gestión de tareas académicas',
  
  // Colores predefinidos para materias
  subjectColors: [
    '#2563EB', // Azul
    '#16a34a', // Verde
    '#dc2626', // Rojo
    '#9333ea', // Púrpura
    '#ea580c', // Naranja
    '#0891b2', // Cyan
    '#be123c', // Rosa
    '#65a30d', // Lima
  ],
  
  // Iconos disponibles para materias
  subjectIcons: [
    'book',
    'code',
    'palette',
    'calculator',
    'globe',
    'microscope',
    'music',
    'pen',
    'laptop',
    'flask',
  ],
  
  // Configuración de notificaciones
  notifications: {
    enabled: true,
    defaultReminders: [
      { label: '1 día antes', hours: 24 },
      { label: '1 hora antes', hours: 1 },
      { label: '30 minutos antes', hours: 0.5 },
    ]
  },
  
  // Configuración de tema
  theme: {
    defaultMode: 'light', // 'light', 'dark', 'system'
  }
};

export default APP_CONFIG;
