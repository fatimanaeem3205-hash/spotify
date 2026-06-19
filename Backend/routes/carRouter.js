const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', verifyToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { brand, name, color, numberPlate, pricePerHour, category } = req.body;
    const imagePath = req.file ? `/public/uploads/${req.file.filename}` : '';
    
    const newCar = new Car({ 
      brand, 
      name, 
      color, 
      numberPlate, 
      pricePerHour: Number(pricePerHour),
      category: category || 'business',
      image: imagePath 
    });
    
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const updateFields = {};

    if (req.body.brand !== undefined) updateFields.brand = req.body.brand;
    if (req.body.name !== undefined) updateFields.name = req.body.name;
    if (req.body.color !== undefined) updateFields.color = req.body.color;
    if (req.body.numberPlate !== undefined) updateFields.numberPlate = req.body.numberPlate;
    if (req.body.category !== undefined) updateFields.category = req.body.category;
    if (req.body.status !== undefined) updateFields.status = req.body.status;
    
    if (req.body.pricePerHour !== undefined) {
      updateFields.pricePerHour = Number(req.body.pricePerHour);
    }
    
    if (req.file) {
      updateFields.image = `/public/uploads/${req.file.filename}`;
    }

    if (updateFields.status === 'available') {
      updateFields.bookingDates = { startDate: null, endDate: null };
      
      const User = require('../models/User');
      await User.updateMany({}, { $pull: { bookedCars: req.params.id } });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id, 
      { $set: updateFields }, 
      { new: true, runValidators: false }
    );
    
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car record asset could not be located.' });
    }
    
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Car profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;