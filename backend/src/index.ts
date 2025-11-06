import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { initializeDatabase } from './config/init-db';
import authRoutes from './routes/auth';

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

// Auth routes
app.use('/api/auth', authRoutes);

// Start server
const startServer = async () => {
  // Test database connection and initialize tables
  try {
    await testConnection();
    console.log('✅ Database connected successfully');
    
    try {
      await initializeDatabase();
    } catch (error) {
      console.warn('⚠️  Database initialization warning:', error instanceof Error ? error.message : 'Unknown error');
    }
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