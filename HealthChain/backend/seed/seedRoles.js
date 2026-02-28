require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const USERS = [
  {
    username: 'drraj',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. S. Raj',
    email: 'dr.raj@hospital.com',
    phone: '+91-1111111111',
    specialty: 'General Physician',
    experienceYears: 12,
    verified: true,
  },
  {
    username: 'dranita',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Anita Sharma',
    email: 'anita@hospital.com',
    phone: '+91-2222222222',
    specialty: 'Internal Medicine',
    experienceYears: 8,
    verified: true,
  },
  {
    username: 'madhan',
    password: 'madhan123',
    role: 'patient',
    name: 'Madhan Kumar',
    email: 'madhan@example.com',
    phone: '+91-9876543210',
    age: 29,
    sex: 'Male',
    bloodGroup: 'B+',
  },
  {
    username: 'pharmaone',
    password: 'pharma123',
    role: 'pharmacy',
    name: 'Pharma One',
    email: 'pharmacy@healthchain.com',
    phone: '+91-3333333333',
  },
];

async function seedRoles() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri || mongoUri.includes('<db_password>')) {
    throw new Error('Set a valid MONGODB_URI/MONGO_URI before running seed.');
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  for (const entry of USERS) {
    const passwordHash = await bcrypt.hash(entry.password, 10);

    await User.findOneAndUpdate(
      { username: entry.username },
      {
        ...entry,
        passwordHash,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  console.log('Role users seeded successfully.');
  console.table(
    USERS.map(({ username, password, role }) => ({ username, password, role }))
  );
}

seedRoles()
  .then(() => mongoose.connection.close())
  .catch(async (error) => {
    console.error('Seed failed:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  });
