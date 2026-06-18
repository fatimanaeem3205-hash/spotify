const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Public Gallery
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Add Car
router.post('/', verifyToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { brand, name, color, numberPlate } = req.body;
    const imagePath = req.file ? `/public/uploads/${req.file.filename}` : '';
    
    const newCar = new Car({ brand, name, color, numberPlate, image: imagePath });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Update Car / Dropdown Status Change
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Delete Car
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Car profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;