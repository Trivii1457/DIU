/**
 * Modelo de Usuario
 */
export class User {
  constructor({
    id = null,
    username = '',
    name = '',
    email = '',
    password = '',
    createdAt = new Date()
  }) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }
}
