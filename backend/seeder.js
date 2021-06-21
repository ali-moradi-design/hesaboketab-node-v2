import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import User from './models/UserModel.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Import into DB
const importData = async () => {
  try {
    await User.deleteMany();
    await User.create(users);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
