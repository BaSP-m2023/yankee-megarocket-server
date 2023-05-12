import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 4000;
const DB_URL = 'mongodb+srv://yankee-team:4csuRIPMo2frFlCj@megarocket-databases.inpprte.mongodb.net/yankee-database';

mongoose.connect(
  DB_URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Failed connection to database', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
