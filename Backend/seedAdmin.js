const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path if your models folder is in a different spot

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CarRent'; 

async function createAdmin() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully...');

    // 2. Check if the admin account already exists
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('ℹ️ Admin account (admin@gmail.com) already exists in the records.');
      process.exit(0);
    }

    // 3. Hash the admin password securely
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // 4. Create and save the admin profile document
    const adminUser = new User({
      name: 'System Administrator',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin', // Make sure this matches your schema's role check string
      bookedCars: []
    });

    await adminUser.save();
    console.log('✅ Admin account created successfully!');
    console.log('Email: admin@gmail.com | Password: admin123');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin account:', err.message);
    process.exit(1);
  }
}

createAdmin();