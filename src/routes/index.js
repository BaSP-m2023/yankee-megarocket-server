import express from 'express';

import superAdminRoutes from './super-admins';
import memberRoutes from './members';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/members', memberRoutes);

export default router;
