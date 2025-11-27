const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Mock database (replace with actual database)
const users = new Map();

// ==========================================
// POST /api/v1/auth/register
// Register new user
// ==========================================
router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().notEmpty(),
  ],
  async (req, res, next) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name } = req.body;

      // Check if user exists
      if (users.has(email)) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 12);

      // Create user
      const user = {
        id: `user_${Date.now()}`,
        email,
        name,
        passwordHash,
        subscriptionTier: 'free',
        createdAt: new Date().toISOString(),
      };

      users.set(email, user);

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'default-secret-change-in-production',
        { expiresIn: '30d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          subscriptionTier: user.subscriptionTier,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ==========================================
// POST /api/v1/auth/login
// Login user
// ==========================================
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = users.get(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'default-secret-change-in-production',
        { expiresIn: '30d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          subscriptionTier: user.subscriptionTier,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ==========================================
// POST /api/v1/auth/refresh-token
// Refresh JWT token
// ==========================================
router.post('/refresh-token', (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    // Verify old token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret-change-in-production',
      { ignoreExpiration: true }
    );

    // Generate new token
    const newToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.JWT_SECRET || 'default-secret-change-in-production',
      { expiresIn: '30d' }
    );

    res.json({ token: newToken });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// POST /api/v1/auth/logout
// Logout user (client-side token deletion)
// ==========================================
router.post('/logout', (req, res) => {
  // With JWT, logout is handled client-side
  // Here you could add token to blacklist if needed
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
