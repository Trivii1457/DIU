import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'unitask',
  user: process.env.DB_USER || 'unitask',
  password: process.env.DB_PASSWORD || 'unitask'
});

export const query = (text, params) => pool.query(text, params);

export const initializeDatabase = async () => {
  try {
    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(50) DEFAULT '#2563EB',
        icon VARCHAR(50) DEFAULT 'book',
        archived BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
        priority VARCHAR(50) DEFAULT 'medium',
        due_date TIMESTAMP,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if demo user exists
    const usersResult = await pool.query('SELECT COUNT(*) FROM users');
    if (parseInt(usersResult.rows[0].count) === 0) {
      console.log('Creating demo user...');
      await pool.query(
        `INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4)`,
        ['demo', 'Usuario Demo', 'demo@unitask.com', 'demo123']
      );
    }

    // Check if demo subjects exist
    const subjectsResult = await pool.query('SELECT COUNT(*) FROM subjects');
    if (parseInt(subjectsResult.rows[0].count) === 0) {
      console.log('Creating demo subjects...');
      await pool.query(`
        INSERT INTO subjects (name, color, icon) VALUES 
        ('Diseño de Interfaces', '#2563EB', '🎨'),
        ('Programación Web', '#16a34a', '💻'),
        ('Bases de Datos', '#dc2626', '🗄️')
      `);

      // Get subject IDs
      const subjectsData = await pool.query('SELECT id FROM subjects ORDER BY id');
      const subjectIds = subjectsData.rows.map(row => row.id);

      // Create demo tasks
      console.log('Creating demo tasks...');
      const now = new Date();
      const tasks = [
        { title: 'Completar prototipo de alta fidelidad', description: 'Diseñar las pantallas principales en Figma', subjectId: subjectIds[0], priority: 'high', dueDays: 2, completed: false },
        { title: 'Investigación de usuarios', description: 'Realizar entrevistas y encuestas', subjectId: subjectIds[0], priority: 'medium', dueDays: 5, completed: true },
        { title: 'Desarrollar API REST', description: 'Implementar endpoints para el proyecto', subjectId: subjectIds[1], priority: 'high', dueDays: 3, completed: false },
        { title: 'Crear wireframes', description: 'Wireframes de baja fidelidad', subjectId: subjectIds[0], priority: 'medium', dueDays: -2, completed: true },
        { title: 'Implementar autenticación', description: 'Sistema de login con JWT', subjectId: subjectIds[1], priority: 'high', dueDays: -1, completed: false },
        { title: 'Optimizar consultas SQL', description: 'Mejorar rendimiento de la base de datos', subjectId: subjectIds[2], priority: 'medium', dueDays: 7, completed: true },
        { title: 'Diseñar sistema de colores', description: 'Paleta de colores para la app', subjectId: subjectIds[0], priority: 'low', dueDays: -5, completed: true },
        { title: 'Configurar CI/CD', description: 'Pipeline de integración continua', subjectId: subjectIds[1], priority: 'medium', dueDays: 10, completed: false },
        { title: 'Modelar base de datos', description: 'Crear diagrama ER', subjectId: subjectIds[2], priority: 'high', dueDays: -3, completed: false },
        { title: 'Pruebas de usabilidad', description: 'Realizar testing con usuarios', subjectId: subjectIds[0], priority: 'high', dueDays: 1, completed: true }
      ];

      for (const task of tasks) {
        const dueDate = new Date(now.getTime() + task.dueDays * 24 * 60 * 60 * 1000);
        await pool.query(
          `INSERT INTO tasks (title, description, subject_id, priority, due_date, completed) VALUES ($1, $2, $3, $4, $5, $6)`,
          [task.title, task.description, task.subjectId, task.priority, dueDate, task.completed]
        );
      }
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export default pool;
