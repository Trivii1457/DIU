import Dexie from 'dexie';

/**
 * Base de datos UniTask usando Dexie (wrapper de IndexedDB)
 */
class UniTaskDatabase extends Dexie {
  constructor() {
    super('UniTaskDB');
    
    // Definición del esquema de la base de datos
    this.version(1).stores({
      tasks: '++id, title, subjectId, priority, dueDate, completed, createdAt, updatedAt',
      subjects: '++id, name, color, archived, createdAt'
    });

    // Mapeo de las tablas a clases
    this.tasks = this.table('tasks');
    this.subjects = this.table('subjects');
  }
}

// Instancia única de la base de datos (Singleton)
export const db = new UniTaskDatabase();

/**
 * Inicializa la base de datos con datos de ejemplo (opcional)
 */
export const initializeDatabase = async () => {
  try {
    // Verificar si ya hay datos
    const subjectsCount = await db.subjects.count();
    
    if (subjectsCount === 0) {
      console.log('Inicializando base de datos con datos de ejemplo...');
      
      // Crear materias de ejemplo
      const subjectIds = await db.subjects.bulkAdd([
        {
          name: 'Diseño de Interfaces',
          color: '#2563EB',
          icon: 'palette',
          archived: false,
          createdAt: new Date()
        },
        {
          name: 'Programación Web',
          color: '#16a34a',
          icon: 'code',
          archived: false,
          createdAt: new Date()
        },
        {
          name: 'Bases de Datos',
          color: '#dc2626',
          icon: 'database',
          archived: false,
          createdAt: new Date()
        }
      ]);

      // Crear tareas de ejemplo
      await db.tasks.bulkAdd([
        {
          title: 'Completar prototipo de alta fidelidad',
          description: 'Diseñar las pantallas principales en Figma',
          subjectId: subjectIds[0],
          priority: 'high',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Investigación de usuarios',
          description: 'Realizar entrevistas y encuestas',
          subjectId: subjectIds[0],
          priority: 'medium',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Desarrollar API REST',
          description: 'Implementar endpoints para el proyecto',
          subjectId: subjectIds[1],
          priority: 'high',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);

      console.log('Base de datos inicializada correctamente');
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};
