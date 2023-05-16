import express from 'express';
import { createSubscription, getAllSubscriptions, getSubscription } from '../controllers/subscriptions';
import { validateSubscription } from '../validations/subscriptions';

const router = express.Router();

router.get('/', getAllSubscriptions);
router.get('/:id', getSubscription);
router.post('/', validateSubscription, createSubscription);

export default router;
