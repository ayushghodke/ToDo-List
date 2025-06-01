const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '0000',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'postgres' // Connect to default database first
});

async function initializeDatabase() {
  try {
    // Create the database if it doesn't exist
    await pool.query('CREATE DATABASE todo_db');
    console.log('Database created successfully');
  } catch (err) {
    if (err.code === '42P04') {
      console.log('Database already exists');
    } else {
      console.error('Error creating database:', err);
      process.exit(1);
    }
  }

  // Close the connection to postgres database
  await pool.end();

  // Create a new pool connection to todo_db
  const todoPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '0000',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'todo_db'
  });

  try {
    // Read and execute the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await todoPool.query(schema);
    console.log('Schema created successfully');
  } catch (err) {
    console.error('Error creating schema:', err);
    process.exit(1);
  }

  await todoPool.end();
  console.log('Database initialization completed');
}

initializeDatabase(); 