import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

// const API_URL = 'http://localhost:5000/api/todos';
const API_URL = 'https://todo-backend-jhps.onrender.com/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.status === 200) {
        setTodos(result.data || []);
      } else {
        setError(result.error || 'Error fetching todos');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Error fetching todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    try {
      setError('');
      if (!todo.title.trim()) {
        setError('Title is required');
        return;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 201) {
        setTodos(prevTodos => [result.data, ...prevTodos]);
      } else {
        setError(result.error || 'Error adding todo');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Error adding todo. Please try again.');
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      setError('');
      if (!updatedTodo.title.trim()) {
        setError('Title is required');
        return;
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 200) {
        setTodos(prevTodos => 
          prevTodos.map(todo => todo.id === id ? result.data : todo)
        );
      } else {
        setError(result.error || 'Error updating todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Error updating todo. Please try again.');
    }
  };

  const toggleTodo = async (id) => {
    try {
      setError('');
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 200) {
        setTodos(prevTodos => 
          prevTodos.map(t => t.id === id ? result.data : t)
        );
      } else {
        setError(result.error || 'Error toggling todo');
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
      setError('Error toggling todo. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError('');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 200) {
        setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
      } else {
        setError(result.error || 'Error deleting todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Error deleting todo. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : (
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
        />
      )}
    </div>
  );
}

export default App; 