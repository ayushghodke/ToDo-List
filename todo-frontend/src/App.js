import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.status === 200) {
        setTodos(data.data);
      } else {
        setError(data.error || 'Error fetching todos');
      }
    } catch (error) {
      setError('Error fetching todos');
    }
  };

  const addTodo = async (todo) => {
    setError('');
    if (!todo.title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      if (data.status === 201) {
        setTodos([...todos, data.data]);
      } else {
        setError(data.error || 'Error adding todo');
      }
    } catch (error) {
      setError('Error adding todo');
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    setError('');
    if (!updatedTodo.title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      if (data.status === 200) {
        setTodos(todos.map(todo => todo.id === id ? data.data : todo));
      } else {
        setError(data.error || 'Error updating todo');
      }
    } catch (error) {
      setError('Error updating todo');
    }
  };

  const toggleTodo = async (id) => {
    setError('');
    try {
      const todo = todos.find(t => t.id === id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: todo.title, 
          description: todo.description, 
          completed: !todo.completed 
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setTodos(todos.map(t => t.id === id ? data.data : t));
      } else {
        setError(data.error || 'Error updating todo');
      }
    } catch (error) {
      setError('Error updating todo');
    }
  };

  const deleteTodo = async (id) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status === 200) {
        setTodos(todos.filter(t => t.id !== id));
      } else {
        setError(data.error || 'Error deleting todo');
      }
    } catch (error) {
      setError('Error deleting todo');
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      {error && <div className="error">{error}</div>}
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
      />
    </div>
  );
}

export default App; 