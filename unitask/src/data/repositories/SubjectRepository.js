import { apiClient } from '../../infrastructure/api/apiClient';

/**
 * Helper function to transform API response to frontend format
 */
const transformSubject = (subject) => {
  if (!subject) return null;
  return {
    id: subject.id,
    name: subject.name,
    color: subject.color,
    icon: subject.icon,
    archived: subject.archived,
    createdAt: subject.created_at ? new Date(subject.created_at) : null
  };
};

/**
 * Repositorio para operaciones CRUD de Materias
 */
export class SubjectRepository {
  /**
   * Obtiene todas las materias
   */
  static async getAll() {
    const subjects = await apiClient.get('/subjects');
    return subjects.map(transformSubject);
  }

  /**
   * Obtiene materias activas (no archivadas)
   */
  static async getActive() {
    const subjects = await apiClient.get('/subjects/active');
    return subjects.map(transformSubject);
  }

  /**
   * Obtiene materias archivadas
   */
  static async getArchived() {
    const subjects = await apiClient.get('/subjects/archived');
    return subjects.map(transformSubject);
  }

  /**
   * Obtiene una materia por ID
   */
  static async getById(id) {
    const subject = await apiClient.get(`/subjects/${id}`);
    return transformSubject(subject);
  }

  /**
   * Crea una nueva materia
   */
  static async create(subjectData) {
    const subject = await apiClient.post('/subjects', {
      name: subjectData.name,
      color: subjectData.color,
      icon: subjectData.icon,
      archived: subjectData.archived || false
    });
    return transformSubject(subject);
  }

  /**
   * Actualiza una materia existente
   */
  static async update(id, updates) {
    const subject = await apiClient.put(`/subjects/${id}`, updates);
    return transformSubject(subject);
  }

  /**
   * Elimina una materia
   */
  static async delete(id) {
    await apiClient.delete(`/subjects/${id}`);
  }

  /**
   * Archiva una materia
   */
  static async archive(id) {
    const subject = await apiClient.put(`/subjects/${id}/archive`, {});
    return transformSubject(subject);
  }

  /**
   * Desarchiva una materia
   */
  static async unarchive(id) {
    const subject = await apiClient.put(`/subjects/${id}/unarchive`, {});
    return transformSubject(subject);
  }

  /**
   * Obtiene el progreso de una materia
   */
  static async getProgress(id) {
    return await apiClient.get(`/subjects/${id}/progress`);
  }

  /**
   * Busca materias por nombre
   */
  static async search(query) {
    const subjects = await apiClient.get(`/subjects/search/${encodeURIComponent(query)}`);
    return subjects.map(transformSubject);
  }
}
