import { db } from '../database/db';

/**
 * Repositorio para operaciones CRUD de Tareas
 */
export class TaskRepository {
  /**
   * Obtiene todas las tareas
   */
  static async getAll() {
    return await db.tasks.toArray();
  }

  /**
   * Obtiene una tarea por ID
   */
  static async getById(id) {
    return await db.tasks.get(id);
  }

  /**
   * Obtiene tareas por materia
   */
  static async getBySubject(subjectId) {
    return await db.tasks.where('subjectId').equals(subjectId).toArray();
  }

  /**
   * Obtiene tareas pendientes
   */
  static async getPending() {
    return await db.tasks.where('completed').equals(false).toArray();
  }

  /**
   * Obtiene tareas completadas
   */
  static async getCompleted() {
    return await db.tasks.where('completed').equals(true).toArray();
  }

  /**
   * Obtiene tareas del día actual
   */
  static async getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await db.tasks
      .where('dueDate')
      .between(today, tomorrow, true, false)
      .toArray();
  }

  /**
   * Obtiene tareas de una semana específica
   */
  static async getByWeek(startDate, endDate) {
    return await db.tasks
      .where('dueDate')
      .between(startDate, endDate, true, true)
      .toArray();
  }

  /**
   * Obtiene tareas por prioridad
   */
  static async getByPriority(priority) {
    return await db.tasks.where('priority').equals(priority).toArray();
  }

  /**
   * Crea una nueva tarea
   */
  static async create(taskData) {
    const id = await db.tasks.add({
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return await this.getById(id);
  }

  /**
   * Actualiza una tarea existente
   */
  static async update(id, updates) {
    await db.tasks.update(id, {
      ...updates,
      updatedAt: new Date()
    });
    return await this.getById(id);
  }

  /**
   * Elimina una tarea
   */
  static async delete(id) {
    await db.tasks.delete(id);
  }

  /**
   * Marca una tarea como completada
   */
  static async markAsCompleted(id) {
    return await this.update(id, { completed: true });
  }

  /**
   * Marca una tarea como pendiente
   */
  static async markAsPending(id) {
    return await this.update(id, { completed: false });
  }

  /**
   * Busca tareas por texto
   */
  static async search(query) {
    const allTasks = await this.getAll();
    const lowerQuery = query.toLowerCase();
    
    return allTasks.filter(task => 
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Obtiene estadísticas de tareas
   */
  static async getStats() {
    const all = await this.getAll();
    const completed = all.filter(t => t.completed);
    const pending = all.filter(t => !t.completed);
    const overdue = pending.filter(t => new Date(t.dueDate) < new Date());

    return {
      total: all.length,
      completed: completed.length,
      pending: pending.length,
      overdue: overdue.length,
      completionRate: all.length > 0 ? (completed.length / all.length) * 100 : 0
    };
  }
}
