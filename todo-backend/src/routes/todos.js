const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json({ status: 200, data: todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ status: 500, error: 'Error fetching todos' });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ status: 400, error: 'Title is required' });
    }
    const todo = await Todo.create({ title, description });
    res.status(201).json({ status: 201, data: todo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ status: 500, error: 'Error creating todo' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ status: 404, error: 'Todo not found' });
    }

    if (title && !title.trim()) {
      return res.status(400).json({ status: 400, error: 'Title cannot be empty' });
    }

    await todo.update({ title, description, completed });
    res.json({ status: 200, data: todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ status: 500, error: 'Error updating todo' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    
    if (!todo) {
      return res.status(404).json({ status: 404, error: 'Todo not found' });
    }

    await todo.destroy();
    res.json({ status: 200, message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ status: 500, error: 'Error deleting todo' });
  }
});

// Toggle todo completion status
router.put('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    
    if (!todo) {
      return res.status(404).json({ status: 404, error: 'Todo not found' });
    }

    await todo.update({ completed: !todo.completed });
    res.json({ status: 200, data: todo });
  } catch (error) {
    console.error('Error toggling todo:', error);
    res.status(500).json({ status: 500, error: 'Error toggling todo' });
  }
});

module.exports = router; 