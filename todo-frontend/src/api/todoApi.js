// Get the API URL from environment variable or use a default
const getApiUrl = () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    if (baseUrl) {
        return baseUrl;
    }
    // Default to localhost in development
    return window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api'
        : '/api'; // In production, use relative path
};

const API_URL = getApiUrl();

const todoApi = {
  async getAllTodos() {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  async createTodo(todo) {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  async updateTodo(id, todo) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },

  async deleteTodo(id) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    return response.json();
  },

  async toggleTodo(id) {
    const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle todo');
    }
    return response.json();
  }
};

export default todoApi; 