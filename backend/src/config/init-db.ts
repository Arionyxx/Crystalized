import pool from './database';

export const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    // Create users table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create index on email for faster lookups
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  } finally {
    client.release();
  }
};
