const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/book', verifyToken, async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const car = await Car.findById(carId);

    if (!car || car.status === 'appointed') {
      return res.status(400).json({ message: 'Car asset is currently unavailable for lease.' });
    }

    car.status = 'appointed';
    car.bookingDates = { startDate: new Date(startDate), endDate: new Date(endDate) };
    await car.save();

    await User.findByIdAndUpdate(req.user.id, { $push: { bookedCars: carId } });

    res.status(200).json({ message: 'Reservation confirmed successfully', car });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;