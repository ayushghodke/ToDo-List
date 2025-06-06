// Get the API URL from environment variable or use a default
const getApiUrl = () => {
    // Always use the environment variable in production
    if (process.env.NODE_ENV === 'production') {
        return 'https://todo-backend-jhps.onrender.com/api';
    }
    // Use localhost in development
    return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();
console.log('API URL:', API_URL); // For debugging

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const todoApi = {
    async getAllTodos() {
        const response = await fetch(`${API_URL}/todos`, {
            headers: defaultHeaders
        });
        return handleResponse(response);
    },

    async createTodo(todo) {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(todo),
        });
        return handleResponse(response);
    },

    async updateTodo(id, todo) {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: defaultHeaders,
            body: JSON.stringify(todo),
        });
        return handleResponse(response);
    },

    async deleteTodo(id) {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: defaultHeaders
        });
        return handleResponse(response);
    },

    async toggleTodo(id) {
        const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
            method: 'PUT',
            headers: defaultHeaders
        });
        return handleResponse(response);
    }
};

export default todoApi; 