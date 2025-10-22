/**
 * Modelo de Materia/Curso
 * @typedef {Object} Subject
 * @property {number} id - ID único de la materia
 * @property {string} name - Nombre de la materia
 * @property {string} color - Color distintivo (hex)
 * @property {string} icon - Nombre del ícono
 * @property {boolean} archived - Si la materia está archivada
 * @property {Date} createdAt - Fecha de creación
 */

export class Subject {
  constructor({
    id = null,
    name = '',
    color = '#2563EB',
    icon = 'book',
    archived = false,
    createdAt = new Date()
  }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.icon = icon;
    this.archived = archived;
    this.createdAt = createdAt;
  }

  /**
   * Archiva la materia
   */
  archive() {
    this.archived = true;
  }

  /**
   * Desarchiva la materia
   */
  unarchive() {
    this.archived = false;
  }
}
