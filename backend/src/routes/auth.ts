import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

interface AuthRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

// POST /api/auth/register
router.post('/register', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email and password are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'Error',
        message: 'Invalid email format',
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        status: 'Error',
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        status: 'Error',
        message: 'User already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      status: 'OK',
      message: 'User registered successfully',
      data: {
        id: user.id,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email and password are required',
      });
    }

    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({
        status: 'Error',
        message: 'Invalid email or password',
      });
    }

    const user = result.rows[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'Error',
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      status: 'OK',
      message: 'Login successful',
      data: {
        id: user.id,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
