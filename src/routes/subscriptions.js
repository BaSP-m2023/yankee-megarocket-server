import express from 'express';

import { updateSubscription, deleteSubscription } from '../controllers/subscriptions';
import { validateSubscription } from '../validations/subscriptions';

const router = express.Router();

router.put('/:id', validateSubscription, updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
