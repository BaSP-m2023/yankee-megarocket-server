import express from 'express';

import superAdminRoutes from './super-admins';
import subscriptionRoutes from './subscriptions';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/subscriptions', subscriptionRoutes);

export default router;
