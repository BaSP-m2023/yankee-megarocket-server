import express from 'express';

import superAdminRoutes from './super-admins';

import membersRoutes from './members';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/members', membersRoutes);

export default router;
