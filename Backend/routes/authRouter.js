const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Car = require('../models/Car');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');


router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body; 
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User profile matches an existing record.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role: 'customer' });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'SECRET_KEY_123', { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid login credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid login credentials.' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'SECRET_KEY_123', { expiresIn: '7d' });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/admin/create-user', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body; 
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User profile matches an existing record.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || 'customer'
    });
    
    await user.save();
    res.status(201).json({ message: `Account created successfully for ${name}!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (role) updateFields.role = role;
    
    if (password && password.trim() !== '') {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json({ message: 'User updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: 'Cannot delete your own active admin session.' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('bookedCars');

    if (!user) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;