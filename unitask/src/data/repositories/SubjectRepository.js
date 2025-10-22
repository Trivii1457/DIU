import { db } from '../database/db';

/**
 * Repositorio para operaciones CRUD de Materias
 */
export class SubjectRepository {
  /**
   * Obtiene todas las materias
   */
  static async getAll() {
    return await db.subjects.toArray();
  }

  /**
   * Obtiene materias activas (no archivadas)
   */
  static async getActive() {
    return await db.subjects.where('archived').equals(false).toArray();
  }

  /**
   * Obtiene materias archivadas
   */
  static async getArchived() {
    return await db.subjects.where('archived').equals(true).toArray();
  }

  /**
   * Obtiene una materia por ID
   */
  static async getById(id) {
    return await db.subjects.get(id);
  }

  /**
   * Crea una nueva materia
   */
  static async create(subjectData) {
    const id = await db.subjects.add({
      ...subjectData,
      createdAt: new Date()
    });
    return await this.getById(id);
  }

  /**
   * Actualiza una materia existente
   */
  static async update(id, updates) {
    await db.subjects.update(id, updates);
    return await this.getById(id);
  }

  /**
   * Elimina una materia
   */
  static async delete(id) {
    // Primero eliminar todas las tareas asociadas
    await db.tasks.where('subjectId').equals(id).delete();
    // Luego eliminar la materia
    await db.subjects.delete(id);
  }

  /**
   * Archiva una materia
   */
  static async archive(id) {
    return await this.update(id, { archived: true });
  }

  /**
   * Desarchiva una materia
   */
  static async unarchive(id) {
    return await this.update(id, { archived: false });
  }

  /**
   * Obtiene el progreso de una materia
   */
  static async getProgress(id) {
    const tasks = await db.tasks.where('subjectId').equals(id).toArray();
    const completed = tasks.filter(t => t.completed).length;
    
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
      percentage: tasks.length > 0 ? (completed / tasks.length) * 100 : 0
    };
  }

  /**
   * Busca materias por nombre
   */
  static async search(query) {
    const allSubjects = await this.getAll();
    const lowerQuery = query.toLowerCase();
    
    return allSubjects.filter(subject => 
      subject.name.toLowerCase().includes(lowerQuery)
    );
  }
}
