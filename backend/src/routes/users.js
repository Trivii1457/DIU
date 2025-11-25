import express from 'express';
import { query } from '../db/index.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT id, username, name, email, created_at FROM users ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Error getting users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT id, username, name, email, created_at FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Error getting user' });
  }
});

// Get user by username
router.get('/username/:username', async (req, res) => {
  try {
    const result = await query('SELECT id, username, name, email, created_at FROM users WHERE username = $1', [req.params.username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Error getting user' });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const result = await query(
      'INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, username, name, email, created_at',
      [username, name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Error creating user' });
    }
  }
});

// Authenticate user
router.post('/authenticate', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await query('SELECT id, username, name, email, created_at FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Error authenticating user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const result = await query(
      'UPDATE users SET username = COALESCE($1, username), name = COALESCE($2, name), email = COALESCE($3, email), password = COALESCE($4, password) WHERE id = $5 RETURNING id, username, name, email, created_at',
      [username, name, email, password, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

export default router;
