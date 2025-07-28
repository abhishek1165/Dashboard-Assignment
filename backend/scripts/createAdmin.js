const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');

const createAdminUser = async () => {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    
    const existingAdmin = await User.findOne({ email: 'admin@dashboard.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    
    const adminUser = new User({
      username: 'admin',
      email: 'admin@dashboard.com',
      password: 'admin123',
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@dashboard.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
