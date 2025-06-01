import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(todo.id, {
        title: editedTitle,
        description: editedDescription,
        completed: todo.completed
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="editing">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Edit title"
          className="edit-input"
        />
        <input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Edit description"
          className="edit-input"
        />
        <div className="todo-actions">
          <button onClick={handleSave} className="edit-btn">Save</button>
          <button onClick={handleCancel} className="delete-btn">Cancel</button>
        </div>
      </li>
    );
  }

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && (
          <span className="todo-description">{todo.description}</span>
        )}
      </div>
      <div className="todo-actions">
        <button onClick={handleEdit} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(todo.id)} className="delete-btn">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem; 