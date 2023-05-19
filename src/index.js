/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  .then(() => console.log('🟢 DB Connected!'))
  .then(() => app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}!`)))
  .catch((error) => console.log('🔴 There was an error on the DB connection method.', error));
