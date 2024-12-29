const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createErrorResponse, createSuccessResponse } = require('../utility/responseHandler');

const router = express.Router();

const users = []; // In-memory user storage (replace with a database)

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(createErrorResponse('All fields are required'));
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json(createErrorResponse('User already exists'));
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const userdata = { name, email, password: hashedPassword };
  const user = await User.create(userdata);

  return res.status(201).json(createSuccessResponse(user,'User registered successfully'));
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(createErrorResponse('Email and password are required'));
  }

  // Check user existence
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json(createErrorResponse('Invalid credentials'));
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json(createErrorResponse('Invalid credentials'));
  }

  // Generate token
  const token = generateToken(user.id);

  return res.status(200).json(createSuccessResponse({ token },'Logged in successfully'));    
});

module.exports = router;
