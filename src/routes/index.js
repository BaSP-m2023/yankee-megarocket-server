import express from 'express';

import superAdminRoutes from './super-admins';

import classesRoutes from './classes';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);

router.use('/classes', classesRoutes);

export default router;
