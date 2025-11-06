import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running', 
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await testConnection();
    res.json({ 
      status: 'OK', 
      message: 'Database connection successful',
      result
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Start server
const startServer = async () => {
  // Test database connection but don't fail if it's not available
  try {
    await testConnection();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.warn('⚠️  Database connection failed, but server will continue:');
    console.warn('   ', error instanceof Error ? error.message : 'Unknown error');
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database test: http://localhost:${PORT}/api/test-db`);
  });
};

startServer();