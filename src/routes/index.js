import express from 'express';

import subscriptionRoutes from './subscriptions';
import superAdminRoutes from './super-admins';

const router = express.Router();

router.use('/subscriptions', subscriptionRoutes);
router.use('/super-admins', superAdminRoutes);

export default router;
