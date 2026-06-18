const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRouter = require('./routes/authRouter');
const carRouter = require('./routes/carRouter');
const bookingRouter = require('./routes/bookingRouter');
const adminRouter = require('./routes/adminRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CarRent')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Route Definitions
app.use('/api/auth', authRouter);
app.use('/api/cars', carRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/admin', adminRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));