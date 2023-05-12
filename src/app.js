import express from 'express';
import cors from 'cors';
import router from './routes';

import adminRouter from './controllers/admins';
import activityRouter from './controllers/activities';
import superAdminRouter from './controllers/super-admins';
import memberRouter from './controllers/members';
import classRouter from './controllers/classes';
import subscriptionRouter from './controllers/subscriptions';
import trainerRouter from './controllers/trainers';

const app = express();

app.use('/super-admins', superAdminRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/admins', adminRouter);
app.use('/trainers', trainerRouter);
app.use('/classes', classRouter);
app.use('/members', memberRouter);
app.use('/activities', activityRouter);

app.use(express.json());
app.use(cors());

app.use(router);

export default app;
