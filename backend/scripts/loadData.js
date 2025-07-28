const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Data = require('../models/Data');

const loadData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Read JSON file
    const dataPath = path.join(__dirname, '../../data/jsondata.json');
    
    if (!fs.existsSync(dataPath)) {
      console.error('jsondata.json file not found in data directory');
      console.log('Please place your jsondata.json file in the data directory');
      process.exit(1);
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(rawData);

    console.log(`Found ${jsonData.length} records in JSON file`);

    // Clear existing data
    await Data.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    const result = await Data.insertMany(jsonData);
    console.log(`Successfully inserted ${result.length} records`);

    // Create indexes
    await Data.createIndexes();
    console.log('Created database indexes');

    process.exit(0);
  } catch (error) {
    console.error('Error loading data:', error);
    process.exit(1);
  }
};

loadData();
