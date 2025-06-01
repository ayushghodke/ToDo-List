const Todo = require('../models/Todo');
const asyncHandler = require('../middleware/asyncHandler');
const { STATUS, STATUS_MESSAGE } = require('../constants/statusCodes');

const todoController = {
  // Get all todos
  getAllTodos: asyncHandler(async (req, res) => {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(STATUS.SUCCESS).json({
      status: STATUS.SUCCESS,
      message: STATUS_MESSAGE[STATUS.SUCCESS],
      data: todos
    });
  }),

  // Create a new todo
  createTodo: asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    
    // Validate title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(STATUS.BAD_REQUEST).json({
        status: STATUS.BAD_REQUEST,
        message: STATUS_MESSAGE[STATUS.BAD_REQUEST],
        error: 'Title is required'
      });
    }

    const todo = await Todo.create({ title, description });
    res.status(STATUS.CREATED).json({
      status: STATUS.CREATED,
      message: STATUS_MESSAGE[STATUS.CREATED],
      data: todo
    });
  }),

  // Update a todo
  updateTodo: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Validate title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(STATUS.BAD_REQUEST).json({
        status: STATUS.BAD_REQUEST,
        message: STATUS_MESSAGE[STATUS.BAD_REQUEST],
        error: 'Title is required'
      });
    }

    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(STATUS.NOT_FOUND).json({
        status: STATUS.NOT_FOUND,
        message: STATUS_MESSAGE[STATUS.NOT_FOUND],
        error: 'Todo not found'
      });
    }

    await todo.update({ title, description, completed });
    res.status(STATUS.SUCCESS).json({
      status: STATUS.SUCCESS,
      message: STATUS_MESSAGE[STATUS.SUCCESS],
      data: todo
    });
  }),

  // Delete a todo
  deleteTodo: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    
    if (!todo) {
      return res.status(STATUS.NOT_FOUND).json({
        status: STATUS.NOT_FOUND,
        message: STATUS_MESSAGE[STATUS.NOT_FOUND],
        error: 'Todo not found'
      });
    }

    await todo.destroy();
    res.status(STATUS.SUCCESS).json({
      status: STATUS.SUCCESS,
      message: STATUS_MESSAGE[STATUS.SUCCESS],
      data: { message: 'Todo deleted successfully' }
    });
  })
};

module.exports = todoController; 