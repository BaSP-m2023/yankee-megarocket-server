import express from 'express';

import superAdminRoutes from './super-admins';
import admiRoute from './admins';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/admins', admiRoute);

export default router;
