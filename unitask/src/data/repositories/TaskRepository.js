import { apiClient } from '../../infrastructure/api/apiClient';

/**
 * Helper function to transform API response to frontend format
 */
const transformTask = (task) => {
  if (!task) return null;
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    subjectId: task.subject_id,
    priority: task.priority,
    dueDate: task.due_date ? new Date(task.due_date) : null,
    completed: task.completed,
    createdAt: task.created_at ? new Date(task.created_at) : null,
    updatedAt: task.updated_at ? new Date(task.updated_at) : null
  };
};

/**
 * Repositorio para operaciones CRUD de Tareas
 */
export class TaskRepository {
  /**
   * Obtiene todas las tareas
   */
  static async getAll() {
    const tasks = await apiClient.get('/tasks');
    return tasks.map(transformTask);
  }

  /**
   * Obtiene una tarea por ID
   */
  static async getById(id) {
    const task = await apiClient.get(`/tasks/${id}`);
    return transformTask(task);
  }

  /**
   * Obtiene tareas por materia
   */
  static async getBySubject(subjectId) {
    const tasks = await apiClient.get(`/tasks/subject/${subjectId}`);
    return tasks.map(transformTask);
  }

  /**
   * Obtiene tareas pendientes
   */
  static async getPending() {
    const tasks = await apiClient.get('/tasks/filter/pending');
    return tasks.map(transformTask);
  }

  /**
   * Obtiene tareas completadas
   */
  static async getCompleted() {
    const tasks = await apiClient.get('/tasks/filter/completed');
    return tasks.map(transformTask);
  }

  /**
   * Obtiene tareas del día actual
   */
  static async getToday() {
    const tasks = await apiClient.get('/tasks/filter/today');
    return tasks.map(transformTask);
  }

  /**
   * Obtiene tareas de una semana específica
   */
  static async getByWeek(startDate, endDate) {
    const start = startDate.toISOString();
    const end = endDate.toISOString();
    const tasks = await apiClient.get(`/tasks/filter/week?start=${start}&end=${end}`);
    return tasks.map(transformTask);
  }

  /**
   * Obtiene tareas por prioridad
   */
  static async getByPriority(priority) {
    const tasks = await apiClient.get(`/tasks/filter/priority/${priority}`);
    return tasks.map(transformTask);
  }

  /**
   * Crea una nueva tarea
   */
  static async create(taskData) {
    const task = await apiClient.post('/tasks', {
      title: taskData.title,
      description: taskData.description,
      subject_id: taskData.subjectId,
      priority: taskData.priority,
      due_date: taskData.dueDate,
      completed: taskData.completed || false
    });
    return transformTask(task);
  }

  /**
   * Actualiza una tarea existente
   */
  static async update(id, updates) {
    const updateData = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.subjectId !== undefined) updateData.subject_id = updates.subjectId;
    if (updates.priority !== undefined) updateData.priority = updates.priority;
    if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate;
    if (updates.completed !== undefined) updateData.completed = updates.completed;
    
    const task = await apiClient.put(`/tasks/${id}`, updateData);
    return transformTask(task);
  }

  /**
   * Elimina una tarea
   */
  static async delete(id) {
    await apiClient.delete(`/tasks/${id}`);
  }

  /**
   * Marca una tarea como completada
   */
  static async markAsCompleted(id) {
    const task = await apiClient.put(`/tasks/${id}/complete`, {});
    return transformTask(task);
  }

  /**
   * Marca una tarea como pendiente
   */
  static async markAsPending(id) {
    const task = await apiClient.put(`/tasks/${id}/pending`, {});
    return transformTask(task);
  }

  /**
   * Busca tareas por texto
   */
  static async search(query) {
    const tasks = await apiClient.get(`/tasks/search/${encodeURIComponent(query)}`);
    return tasks.map(transformTask);
  }

  /**
   * Obtiene estadísticas de tareas
   */
  static async getStats() {
    return await apiClient.get('/tasks/stats/summary');
  }
}
