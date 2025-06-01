import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', fontWeight: 'bold' }}>
        {todo.title}
      </span>
      {todo.description && <span style={{ marginLeft: 8, color: '#555' }}> - {todo.description}</span>}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem; 