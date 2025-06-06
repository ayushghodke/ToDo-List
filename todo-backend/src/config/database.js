const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Use the full DATABASE_URL if provided, otherwise use individual parameters
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: !isProduction ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    retry: {
        max: 3
    }
});

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        console.log('Environment:', process.env.NODE_ENV || 'development');
        console.log('Region: Oregon (US West)');
        
        // Log connection info (without sensitive data)
        const dbUrl = new URL(process.env.DATABASE_URL);
        console.log('Database:', dbUrl.pathname.substring(1));
        console.log('Host:', dbUrl.hostname);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        if (error.original) {
            console.error('Original error:', error.original);
        }
        // Don't exit in production, let the application handle reconnection
        if (!isProduction) {
            process.exit(1);
        }
    }
};

testConnection();

module.exports = sequelize; 