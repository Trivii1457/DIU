import Dexie from 'dexie';

/**
 * Base de datos UniTask usando Dexie (wrapper de IndexedDB)
 */
class UniTaskDatabase extends Dexie {
  constructor() {
    super('UniTaskDB');
    
    // Definición del esquema de la base de datos
    this.version(2).stores({
      tasks: '++id, title, subjectId, priority, dueDate, completed, createdAt, updatedAt',
      subjects: '++id, name, color, archived, createdAt',
      users: '++id, username, email, createdAt'
    });

    // Mapeo de las tablas a clases
    this.tasks = this.table('tasks');
    this.subjects = this.table('subjects');
    this.users = this.table('users');
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
    const usersCount = await db.users.count();
    
    // Initialize demo user if no users exist
    if (usersCount === 0) {
      console.log('Creando usuario de demostración...');
      await db.users.add({
        username: 'demo',
        name: 'Usuario Demo',
        email: 'demo@unitask.com',
        password: 'demo123',
        createdAt: new Date()
      });
    }
    
    if (subjectsCount === 0) {
      console.log('Inicializando base de datos con datos de ejemplo...');
      
      // Crear materias de ejemplo
      const subjectIds = await db.subjects.bulkAdd([
        {
          name: 'Diseño de Interfaces',
          color: '#2563EB',
          icon: '🎨',
          archived: false,
          createdAt: new Date()
        },
        {
          name: 'Programación Web',
          color: '#16a34a',
          icon: '💻',
          archived: false,
          createdAt: new Date()
        },
        {
          name: 'Bases de Datos',
          color: '#dc2626',
          icon: '🗄️',
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
          completed: true,
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
        },
        {
          title: 'Crear wireframes',
          description: 'Wireframes de baja fidelidad',
          subjectId: subjectIds[0],
          priority: 'medium',
          dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Implementar autenticación',
          description: 'Sistema de login con JWT',
          subjectId: subjectIds[1],
          priority: 'high',
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Optimizar consultas SQL',
          description: 'Mejorar rendimiento de la base de datos',
          subjectId: subjectIds[2],
          priority: 'medium',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Diseñar sistema de colores',
          description: 'Paleta de colores para la app',
          subjectId: subjectIds[0],
          priority: 'low',
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Configurar CI/CD',
          description: 'Pipeline de integración continua',
          subjectId: subjectIds[1],
          priority: 'medium',
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Modelar base de datos',
          description: 'Crear diagrama ER',
          subjectId: subjectIds[2],
          priority: 'high',
          dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Pruebas de usabilidad',
          description: 'Realizar testing con usuarios',
          subjectId: subjectIds[0],
          priority: 'high',
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          completed: true,
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
