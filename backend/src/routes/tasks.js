import express from 'express';
import { query } from '../db/index.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Error getting tasks' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ error: 'Error getting task' });
  }
});

// Get tasks by subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const result = await query('SELECT * FROM tasks WHERE subject_id = $1 ORDER BY id', [req.params.subjectId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting tasks by subject:', error);
    res.status(500).json({ error: 'Error getting tasks by subject' });
  }
});

// Get pending tasks
router.get('/filter/pending', async (req, res) => {
  try {
    const result = await query('SELECT * FROM tasks WHERE completed = FALSE ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting pending tasks:', error);
    res.status(500).json({ error: 'Error getting pending tasks' });
  }
});

// Get completed tasks
router.get('/filter/completed', async (req, res) => {
  try {
    const result = await query('SELECT * FROM tasks WHERE completed = TRUE ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting completed tasks:', error);
    res.status(500).json({ error: 'Error getting completed tasks' });
  }
});

// Get today's tasks
router.get('/filter/today', async (req, res) => {
  try {
    const result = await query(`
      SELECT * FROM tasks 
      WHERE due_date >= CURRENT_DATE 
      AND due_date < CURRENT_DATE + INTERVAL '1 day'
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting today tasks:', error);
    res.status(500).json({ error: 'Error getting today tasks' });
  }
});

// Get tasks by week
router.get('/filter/week', async (req, res) => {
  try {
    const { start, end } = req.query;
    const result = await query(
      'SELECT * FROM tasks WHERE due_date >= $1 AND due_date <= $2 ORDER BY id',
      [start, end]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting tasks by week:', error);
    res.status(500).json({ error: 'Error getting tasks by week' });
  }
});

// Get tasks by priority
router.get('/filter/priority/:priority', async (req, res) => {
  try {
    const result = await query('SELECT * FROM tasks WHERE priority = $1 ORDER BY id', [req.params.priority]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting tasks by priority:', error);
    res.status(500).json({ error: 'Error getting tasks by priority' });
  }
});

// Get task statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE completed = TRUE) as completed,
        COUNT(*) FILTER (WHERE completed = FALSE) as pending,
        COUNT(*) FILTER (WHERE completed = FALSE AND due_date < CURRENT_TIMESTAMP) as overdue
      FROM tasks
    `);
    
    const data = result.rows[0];
    const total = parseInt(data.total);
    const completed = parseInt(data.completed);
    const pending = parseInt(data.pending);
    const overdue = parseInt(data.overdue);
    
    res.json({
      total,
      completed,
      pending,
      overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    });
  } catch (error) {
    console.error('Error getting task stats:', error);
    res.status(500).json({ error: 'Error getting task stats' });
  }
});

// Create task
router.post('/', async (req, res) => {
  try {
    const { title, description, subject_id, subjectId, priority, due_date, dueDate, completed } = req.body;
    const actualSubjectId = subject_id || subjectId;
    const actualDueDate = due_date || dueDate;
    
    const result = await query(
      'INSERT INTO tasks (title, description, subject_id, priority, due_date, completed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description || '', actualSubjectId, priority || 'medium', actualDueDate, completed || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, subject_id, subjectId, priority, due_date, dueDate, completed } = req.body;
    const actualSubjectId = subject_id !== undefined ? subject_id : subjectId;
    const actualDueDate = due_date !== undefined ? due_date : dueDate;
    
    const result = await query(
      `UPDATE tasks SET 
        title = COALESCE($1, title), 
        description = COALESCE($2, description), 
        subject_id = COALESCE($3, subject_id), 
        priority = COALESCE($4, priority), 
        due_date = COALESCE($5, due_date), 
        completed = COALESCE($6, completed),
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = $7 RETURNING *`,
      [title, description, actualSubjectId, priority, actualDueDate, completed, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Mark task as completed
router.put('/:id/complete', async (req, res) => {
  try {
    const result = await query(
      'UPDATE tasks SET completed = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ error: 'Error completing task' });
  }
});

// Mark task as pending
router.put('/:id/pending', async (req, res) => {
  try {
    const result = await query(
      'UPDATE tasks SET completed = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error marking task as pending:', error);
    res.status(500).json({ error: 'Error marking task as pending' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

// Search tasks
router.get('/search/:query', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM tasks WHERE LOWER(title) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1) ORDER BY id',
      [`%${req.params.query}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching tasks:', error);
    res.status(500).json({ error: 'Error searching tasks' });
  }
});

export default router;
