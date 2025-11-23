import { db } from '../database/db';

/**
 * Repositorio para operaciones CRUD de Usuarios
 */
export class UserRepository {
  /**
   * Obtiene todos los usuarios
   */
  static async getAll() {
    return await db.users.toArray();
  }

  /**
   * Obtiene un usuario por ID
   */
  static async getById(id) {
    return await db.users.get(id);
  }

  /**
   * Obtiene un usuario por username
   */
  static async getByUsername(username) {
    return await db.users.where('username').equals(username).first();
  }

  /**
   * Obtiene un usuario por email
   */
  static async getByEmail(email) {
    return await db.users.where('email').equals(email).first();
  }

  /**
   * Crea un nuevo usuario
   */
  static async create(userData) {
    const id = await db.users.add({
      ...userData,
      createdAt: new Date()
    });
    return await this.getById(id);
  }

  /**
   * Actualiza un usuario existente
   */
  static async update(id, updates) {
    await db.users.update(id, updates);
    return await this.getById(id);
  }

  /**
   * Elimina un usuario
   */
  static async delete(id) {
    await db.users.delete(id);
  }

  /**
   * Autentica un usuario
   */
  static async authenticate(username, password) {
    const user = await this.getByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
