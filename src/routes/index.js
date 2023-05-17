import express from 'express';

import classesRoutes from './classes';
import membersRoutes from './members';
import superAdminsRoutes from './super-admins';
import subscriptionRoutes from './subscriptions';
import trainerRoutes from './trainers';
import adminsRoutes from './admins';

import activityRoutes from './activities';

const router = express.Router();

router.use('/classes', classesRoutes);
router.use('/members', membersRoutes);
router.use('/activities', activityRoutes);
router.use('/super-admins', superAdminsRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/trainers', trainerRoutes);
router.use('/admins', adminsRoutes);

export default router;
