import express from 'express';

import superAdminRoutes from './super-admins';

import membersRoutes from './members';

import activityRoutes from './activities';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/members', membersRoutes);
router.use('/activities', activityRoutes);

export default router;
