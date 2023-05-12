import express from 'express';

import superAdminRoutes from './super-admins';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);

export default router;
