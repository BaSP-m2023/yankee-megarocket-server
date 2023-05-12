/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL || 'mongodb+srv://yankee-team:4csuRIPMo2frFlCj@megarocket-databases.inpprte.mongodb.net/yankee-database';

mongoose.connect(DB_URL)
  .then(() => console.log('🟢 DB Connected!'))
  .then(() => app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}!`)))
  .catch((error) => console.log('🔴 There was an error on the DB connection method.', error));
