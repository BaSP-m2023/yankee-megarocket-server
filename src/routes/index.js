import express from 'express';

import superAdminRoutes from './super-admins';
import adminsRoutes from './admins';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/admins', adminsRoutes);

export default router;
