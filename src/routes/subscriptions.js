import express from 'express';
import { createSubscription, getAllSubscriptions, getSubscription } from '../controllers/subscriptions';
import { validateSubCreation } from '../validations/subscriptions';

const router = express.Router();

router.get('/', getAllSubscriptions);
router.get('/:id', getSubscription);
router.post('/', validateSubCreation, createSubscription);

export default router;
