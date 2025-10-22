import clsx from 'clsx';

/**
 * Utilidad para combinar clases CSS
 * Usa clsx para combinar clases condicionales de forma eficiente
 */
export const cn = (...inputs) => {
  return clsx(inputs);
};

/**
 * Formatea una fecha de forma legible
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Resetear horas para comparación de días
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  const compareDate = new Date(d);
  compareDate.setHours(0, 0, 0, 0);
  
  if (compareDate.getTime() === today.getTime()) {
    return 'Hoy';
  } else if (compareDate.getTime() === tomorrow.getTime()) {
    return 'Mañana';
  }
  
  return d.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short',
    year: d.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  });
};

/**
 * Formatea fecha y hora
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calcula los días restantes hasta una fecha
 */
export const daysUntil = (date) => {
  if (!date) return null;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Verifica si una fecha está vencida
 */
export const isOverdue = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

/**
 * Obtiene el color según la prioridad
 */
export const getPriorityColor = (priority) => {
  const colors = {
    low: 'text-blue-600 bg-blue-50',
    medium: 'text-yellow-600 bg-yellow-50',
    high: 'text-red-600 bg-red-50'
  };
  return colors[priority] || colors.medium;
};

/**
 * Obtiene el texto según la prioridad
 */
export const getPriorityLabel = (priority) => {
  const labels = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  };
  return labels[priority] || labels.medium;
};

/**
 * Trunca un texto a un número específico de caracteres
 */
export const truncate = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Genera un ID único simple
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
