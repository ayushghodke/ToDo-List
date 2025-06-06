const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || {
    database: process.env.DB_NAME || 'todo_app',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '0000',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    }
});

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        if (error.original) {
            console.error('Original error:', error.original);
        }
        process.exit(1); // Exit if database connection fails
    }
};

testConnection();

module.exports = sequelize; 