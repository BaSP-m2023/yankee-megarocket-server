import express from 'express';
import { getAllSubscriptions, getSubscription } from '../controllers/subscriptions';

const router = express.Router();

router.get('/', getAllSubscriptions);
router.get('/:id', getSubscription);

export default router;
