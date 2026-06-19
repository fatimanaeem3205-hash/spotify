const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  brand: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  color: { 
    type: String, 
    required: true 
  },
  numberPlate: { 
    type: String, 
    required: true, 
    unique: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  pricePerHour: { 
    type: Number, 
    required: true,
    min: 0
  },
  category: { 
    type: String, 
    required: true,
    enum: ['business', 'family', 'adventure', 'wedding'],
    lowercase: true,
    trim: true
  },
  status: { 
    type: String, 
    enum: ['available', 'appointed'], 
    default: 'available' 
  },
  bookingDates: {
    startDate: { 
        type: Date, 
        default: null 
    },
    endDate: { 
        type: Date, 
        default: null 
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);