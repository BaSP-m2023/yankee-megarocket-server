import express from 'express';

import superAdminRoutes from './super-admins';
import trainerRoutes from './trainers';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/trainers', trainerRoutes);

export default router;
