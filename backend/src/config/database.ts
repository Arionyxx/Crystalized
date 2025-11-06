import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const testConnection = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    return result.rows[0];
  } finally {
    client.release();
  }
};

export default pool;