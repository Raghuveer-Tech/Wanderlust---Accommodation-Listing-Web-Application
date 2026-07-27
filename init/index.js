require('dotenv').config();

const mongoose = require('mongoose');
const Listing = require('../models/listing');
const User = require('../models/user');
const initData = require('./data');

const MONGO_URL = process.env.ATLASTDB_URL || 'mongodb://127.0.0.1:27017/wanderlust';
const action = process.argv[2];

async function connectDB() {
  await mongoose.connect(MONGO_URL, {
    serverSelectionTimeoutMS: 15000,
  });
}

async function createSeedUser() {
  const existing = await User.findOne({ email: 'seed@wanderlust.app' });
  if (existing) return existing;

  const seedUser = new User({
    email: 'seed@wanderlust.app',
    username: 'seedhost'
  });
  return await User.register(seedUser, 'SeedPassword123!');
}

const initDB = async () => {
  await Listing.deleteMany({});
  await User.deleteMany({ email: 'seed@wanderlust.app' });

  const registeredUser = await createSeedUser();

  const seededData = initData.data.map((obj) => ({
    ...obj,
    owner: registeredUser._id,
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
  }));

  await Listing.insertMany(seededData);
  console.log('Data initialized with seed user:', registeredUser._id);
};

const clearDB = async () => {
  await Listing.deleteMany({});
  console.log('All listings were deleted');
};

const run = async () => {
  try {
    await connectDB();
    if (action === 'clear') {
      await clearDB();
    } else {
      await initDB();
    }
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await mongoose.disconnect();
  }
};

run();
