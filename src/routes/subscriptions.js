import express from 'express';
import {
  getSubscriptions, getSubscriptionById,
  postSubscription, putSubscriptionById, deleteSubscriptionById,
} from '../controllers/subscriptions';
import validSubscription from '../validations/subscriptions';

const router = express.Router();

router.get('/', getSubscriptions);
router.get('/:id', getSubscriptionById);
router.post('/', validSubscription, postSubscription);
router.put('/:id', validSubscription, putSubscriptionById);
router.delete('/:id', deleteSubscriptionById);

export default router;
