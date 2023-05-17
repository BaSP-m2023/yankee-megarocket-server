import express from 'express';
import {
  createSubscription, getAllSubscriptions, getSubscription, updateSubscription, deleteSubscription,
} from '../controllers/subscriptions';
import { validateSubscription } from '../validations/subscriptions';

const router = express.Router();

router.get('/', getAllSubscriptions);
router.get('/:id', getSubscription);
router.post('/', validateSubscription, createSubscription);
router.put('/:id', validateSubscription, updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
