// Get the API URL from environment variable or use a default
const getApiUrl = () => {
    // Always use the environment variable in production
    if (process.env.NODE_ENV === 'production') {
        // Remove any trailing slashes to ensure consistent URL formatting
        return 'https://todo-backend-jhps.onrender.com/api';
    }
    // Use localhost in development
    return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();
console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', API_URL); // For debugging

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

const handleResponse = async (response) => {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        try {
            const error = JSON.parse(errorText);
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        } catch (e) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    }
    return response.json();
};

const fetchWithErrorHandling = async (url, options = {}) => {
    try {
        console.log('Fetching URL:', url);
        console.log('Fetch options:', options);
        
        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            },
            mode: 'cors'
        });
        
        return handleResponse(response);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const todoApi = {
    async getAllTodos() {
        return fetchWithErrorHandling(`${API_URL}/todos`);
    },

    async createTodo(todo) {
        return fetchWithErrorHandling(`${API_URL}/todos`, {
            method: 'POST',
            body: JSON.stringify(todo),
        });
    },

    async updateTodo(id, todo) {
        return fetchWithErrorHandling(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
        });
    },

    async deleteTodo(id) {
        return fetchWithErrorHandling(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
        });
    },

    async toggleTodo(id) {
        return fetchWithErrorHandling(`${API_URL}/todos/${id}/toggle`, {
            method: 'PUT',
        });
    }
};

export default todoApi; 