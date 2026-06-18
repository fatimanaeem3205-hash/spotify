// routes/adminRouter.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); // Assuming you use JWT for session tokens

// Middleware to verify the user is logged in AND is an admin
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    // Decode token (Ensure 'process.env.JWT_SECRET' matches your auth setup)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Find user inside database to check privileges
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Access restricted to Admins only' });
    }

    req.user = user; // Pass user data forward
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

// Admin Endpoint to Create New User Accounts
router.post('/create-user', verifyAdmin, async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // 1. Check if user credentials already exist
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User with this email already exists' });

    // 2. Hash the user-specified password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save new profile configuration
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user' // Default to normal user unless specified otherwise
    });

    await newUser.save();
    res.status(201).json({ message: `Account for ${username} created successfully by Admin!` });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;