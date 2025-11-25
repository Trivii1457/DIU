import { apiClient } from '../../infrastructure/api/apiClient';

/**
 * Helper function to transform API response to frontend format
 */
const transformUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    createdAt: user.created_at ? new Date(user.created_at) : null
  };
};

/**
 * Repositorio para operaciones CRUD de Usuarios
 */
export class UserRepository {
  /**
   * Obtiene todos los usuarios
   */
  static async getAll() {
    const users = await apiClient.get('/users');
    return users.map(transformUser);
  }

  /**
   * Obtiene un usuario por ID
   */
  static async getById(id) {
    const user = await apiClient.get(`/users/${id}`);
    return transformUser(user);
  }

  /**
   * Obtiene un usuario por username
   */
  static async getByUsername(username) {
    try {
      const user = await apiClient.get(`/users/username/${encodeURIComponent(username)}`);
      return transformUser(user);
    } catch {
      return null;
    }
  }

  /**
   * Obtiene un usuario por email
   */
  static async getByEmail(email) {
    try {
      // This endpoint doesn't exist in backend, we'll check via getAll for now
      const users = await this.getAll();
      return users.find(u => u.email === email) || null;
    } catch {
      return null;
    }
  }

  /**
   * Crea un nuevo usuario
   */
  static async create(userData) {
    const user = await apiClient.post('/users', {
      username: userData.username,
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
    return transformUser(user);
  }

  /**
   * Actualiza un usuario existente
   */
  static async update(id, updates) {
    const user = await apiClient.put(`/users/${id}`, updates);
    return transformUser(user);
  }

  /**
   * Elimina un usuario
   */
  static async delete(id) {
    await apiClient.delete(`/users/${id}`);
  }

  /**
   * Autentica un usuario
   */
  static async authenticate(username, password) {
    try {
      const user = await apiClient.post('/users/authenticate', { username, password });
      return transformUser(user);
    } catch {
      return null;
    }
  }
}
