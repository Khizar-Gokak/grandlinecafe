import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { jwtSecret, requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'onepiece@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'grandlinecafe';

// POST /api/users/register - Register a new account
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12),
    });

    const userObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: userObj,
        token: jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: '7d' }),
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/users/login - Authenticate existing user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });

    if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      if (!user) {
        user = await User.create({
          name: 'Grand Line Administrator',
          email: ADMIN_EMAIL,
          password: await bcrypt.hash(ADMIN_PASSWORD, 12),
          role: 'admin',
        });
      } else if (user.role !== 'admin') {
        user.role = 'admin';
        user.password = await bcrypt.hash(ADMIN_PASSWORD, 12);
        await user.save();
      }
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const userObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    };

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userObj,
        token: jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: '7d' }),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/users/me - Return the current authenticated profile
router.get('/me', requireAuth, (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

export default router;
