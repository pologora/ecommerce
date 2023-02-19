const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const connectBase = async () => {
  const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
  mongoose.set('strictQuery', false);
  await mongoose.connect(DB);

  console.log('DB connected');
};

module.exports = connectBase;
