const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('todo_app', 'postgres', '0000', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: console.log, // Enable logging temporarily for debugging
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        // Log more detailed error information
        if (error.original) {
            console.error('Original error:', error.original);
        }
        // Log the connection details (without password) for debugging
        console.log('Connection attempt details:', {
            database: 'todo_app',
            user: 'postgres',
            host: 'localhost',
            port: 5432
        });
    }
};

testConnection();

module.exports = sequelize; 