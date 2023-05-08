import express from 'express';
import cors from 'cors';

// use "require" to import JSON files

import superAdminRouter from './resources/super-admins';
import subscriptionRouter from './resources/subscription';

const activityRouter = require('./resources/activity');
const adminRouter = require('./resources/admins');
const trainerRouter = require('./resources/trainer');
const classRouter = require('./resources/class');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/super-admins', superAdminRouter);
app.use('/subscriptions', subscriptionRouter);

app.use('/activity', activityRouter);
app.use('/admins', adminRouter);
app.use('/trainers', trainerRouter);
app.use('/classes', classRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
