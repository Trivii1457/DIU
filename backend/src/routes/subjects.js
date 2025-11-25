import express from 'express';
import { query } from '../db/index.js';

const router = express.Router();

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM subjects ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting subjects:', error);
    res.status(500).json({ error: 'Error getting subjects' });
  }
});

// Get active subjects (not archived)
router.get('/active', async (req, res) => {
  try {
    const result = await query('SELECT * FROM subjects WHERE archived = FALSE ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting active subjects:', error);
    res.status(500).json({ error: 'Error getting active subjects' });
  }
});

// Get archived subjects
router.get('/archived', async (req, res) => {
  try {
    const result = await query('SELECT * FROM subjects WHERE archived = TRUE ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting archived subjects:', error);
    res.status(500).json({ error: 'Error getting archived subjects' });
  }
});

// Get subject by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM subjects WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error getting subject:', error);
    res.status(500).json({ error: 'Error getting subject' });
  }
});

// Get progress for a subject
router.get('/:id/progress', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE completed = TRUE) as completed,
        COUNT(*) FILTER (WHERE completed = FALSE) as pending
      FROM tasks WHERE subject_id = $1
    `, [req.params.id]);
    
    const data = result.rows[0];
    const total = parseInt(data.total);
    const completed = parseInt(data.completed);
    const pending = parseInt(data.pending);
    
    res.json({
      total,
      completed,
      pending,
      percentage: total > 0 ? (completed / total) * 100 : 0
    });
  } catch (error) {
    console.error('Error getting subject progress:', error);
    res.status(500).json({ error: 'Error getting subject progress' });
  }
});

// Create subject
router.post('/', async (req, res) => {
  try {
    const { name, color, icon, archived } = req.body;
    const result = await query(
      'INSERT INTO subjects (name, color, icon, archived) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, color || '#2563EB', icon || 'book', archived || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({ error: 'Error creating subject' });
  }
});

// Update subject
router.put('/:id', async (req, res) => {
  try {
    const { name, color, icon, archived } = req.body;
    const result = await query(
      'UPDATE subjects SET name = COALESCE($1, name), color = COALESCE($2, color), icon = COALESCE($3, icon), archived = COALESCE($4, archived) WHERE id = $5 RETURNING *',
      [name, color, icon, archived, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ error: 'Error updating subject' });
  }
});

// Archive subject
router.put('/:id/archive', async (req, res) => {
  try {
    const result = await query('UPDATE subjects SET archived = TRUE WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error archiving subject:', error);
    res.status(500).json({ error: 'Error archiving subject' });
  }
});

// Unarchive subject
router.put('/:id/unarchive', async (req, res) => {
  try {
    const result = await query('UPDATE subjects SET archived = FALSE WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error unarchiving subject:', error);
    res.status(500).json({ error: 'Error unarchiving subject' });
  }
});

// Delete subject (cascades to tasks)
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM subjects WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ error: 'Error deleting subject' });
  }
});

// Search subjects
router.get('/search/:query', async (req, res) => {
  try {
    const result = await query('SELECT * FROM subjects WHERE LOWER(name) LIKE LOWER($1) ORDER BY id', [`%${req.params.query}%`]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching subjects:', error);
    res.status(500).json({ error: 'Error searching subjects' });
  }
});

export default router;
