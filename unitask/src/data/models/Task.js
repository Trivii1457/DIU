/**
 * Modelo de Tarea
 * @typedef {Object} Task
 * @property {number} id - ID único de la tarea
 * @property {string} title - Título de la tarea
 * @property {string} description - Descripción detallada
 * @property {number} subjectId - ID de la materia asociada
 * @property {string} priority - Prioridad: 'low', 'medium', 'high'
 * @property {Date} dueDate - Fecha límite
 * @property {boolean} completed - Estado de completado
 * @property {Date} createdAt - Fecha de creación
 * @property {Date} updatedAt - Fecha de última actualización
 */

export class Task {
  constructor({
    id = null,
    title = '',
    description = '',
    subjectId = null,
    priority = 'medium',
    dueDate = new Date(),
    completed = false,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.subjectId = subjectId;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Marca la tarea como completada
   */
  markAsCompleted() {
    this.completed = true;
    this.updatedAt = new Date();
  }

  /**
   * Marca la tarea como pendiente
   */
  markAsPending() {
    this.completed = false;
    this.updatedAt = new Date();
  }

  /**
   * Verifica si la tarea está vencida
   */
  isOverdue() {
    return !this.completed && new Date() > this.dueDate;
  }
}
