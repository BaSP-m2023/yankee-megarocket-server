import express from 'express';
import { createSubscription, getAllSubscriptions, getSubscription } from '../controllers/subscriptions';

const router = express.Router();

router.get('/', getAllSubscriptions);
router.get('/:id', getSubscription);
router.post('/', createSubscription);

export default router;
